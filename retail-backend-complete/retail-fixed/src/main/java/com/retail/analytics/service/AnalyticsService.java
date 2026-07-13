package com.retail.analytics.service;

import com.retail.analytics.dto.*;
import com.retail.billing.entity.Bill;
import com.retail.billing.entity.BillItem;
import com.retail.billing.repository.*;
import com.retail.customer.repository.CustomerRepository;
import com.retail.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final BillRepository billRepository;
    private final BillItemRepository billItemRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;

    public AnalyticsService(BillRepository billRepository, BillItemRepository billItemRepository,
                            ProductRepository productRepository, CustomerRepository customerRepository) {
        this.billRepository = billRepository;
        this.billItemRepository = billItemRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    public DashboardResponse getDashboard() {
        long totalProducts  = productRepository.count();
        long totalCustomers = customerRepository.count();
        long totalSales     = billRepository.count();
        BigDecimal revenue  = getTotalRevenue();
        long lowStockCount  = productRepository.findLowStockProducts().size();
        return new DashboardResponse(totalProducts, totalCustomers, totalSales, revenue, lowStockCount);
    }

    public long getTotalSales() { return billRepository.count(); }

    public BigDecimal getTotalRevenue() {
        BigDecimal rev = billRepository.sumRevenueByDateRange(
                LocalDateTime.of(2000, 1, 1, 0, 0), LocalDateTime.now());
        return rev != null ? rev : BigDecimal.ZERO;
    }

    public List<TopProductResponse> getTopProducts() {
        return billItemRepository.findTopSellingProducts().stream()
                .limit(10)
                .map(row -> new TopProductResponse(
                        ((Number) row[0]).longValue(),
                        (String) row[1],
                        ((Number) row[2]).longValue(),
                        new BigDecimal(row[3].toString())))
                .collect(Collectors.toList());
    }

    /** Daily sales for a given date (defaults to today). */
    public DailySalesResponse getDailySales(String date) {
        LocalDate day = (date != null && !date.isEmpty())
                ? LocalDate.parse(date) : LocalDate.now();
        LocalDateTime start = day.atStartOfDay();
        LocalDateTime end   = day.atTime(23, 59, 59);

        List<Bill> bills = billRepository.findByBillDateBetween(start, end);
        BigDecimal total = bills.stream().map(Bill::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Build hourly breakdown 06:00-22:00
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("HH:mm");
        List<DailySalesResponse.HourlyData> hourly = new ArrayList<>();
        for (int h = 6; h <= 22; h++) {
            final int hour = h;
            BigDecimal hourSales = bills.stream()
                    .filter(b -> b.getBillDate().getHour() == hour)
                    .map(Bill::getTotalAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            hourly.add(new DailySalesResponse.HourlyData(
                    String.format("%02d:00", hour), hourSales));
        }

        return new DailySalesResponse(day.toString(), total, bills.size(), hourly);
    }

    /** Monthly sales breakdown — last 30 days by day. */
    public MonthlySalesResponse getMonthlySales() {
        LocalDateTime start = LocalDateTime.now().minusDays(30);
        LocalDateTime end   = LocalDateTime.now();
        List<Bill> bills = billRepository.findByBillDateBetween(start, end);

        // Group by date
        Map<LocalDate, BigDecimal> byDay = new TreeMap<>();
        for (Bill b : bills) {
            LocalDate d = b.getBillDate().toLocalDate();
            byDay.merge(d, b.getTotalAmount(), BigDecimal::add);
        }

        List<MonthlySalesResponse.DailyData> daily = byDay.entrySet().stream()
                .map(e -> new MonthlySalesResponse.DailyData(e.getKey().toString(), e.getValue()))
                .collect(Collectors.toList());

        BigDecimal total = daily.stream().map(MonthlySalesResponse.DailyData::getSales)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new MonthlySalesResponse(LocalDate.now().toString().substring(0, 7), total, daily);
    }

    /** Revenue trend — last 7 days with profit margin calculation. */
    public RevenueTrendResponse getRevenue() {
        LocalDateTime start = LocalDateTime.now().minusDays(7);
        LocalDateTime end   = LocalDateTime.now();
        List<Bill> bills = billRepository.findByBillDateBetween(start, end);

        Map<LocalDate, BigDecimal> byDay = new TreeMap<>();
        for (Bill b : bills) {
            LocalDate d = b.getBillDate().toLocalDate();
            byDay.merge(d, b.getTotalAmount(), BigDecimal::add);
        }

        // Fill missing days with zero
        List<RevenueTrendResponse.TrendPoint> trend = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate d = LocalDate.now().minusDays(i);
            trend.add(new RevenueTrendResponse.TrendPoint(
                    d.toString(), byDay.getOrDefault(d, BigDecimal.ZERO)));
        }

        BigDecimal totalRevenue = byDay.values().stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalCost    = totalRevenue.multiply(BigDecimal.valueOf(0.62)).setScale(2, RoundingMode.HALF_UP);
        double profitMargin = totalRevenue.compareTo(BigDecimal.ZERO) == 0 ? 0 :
                totalRevenue.subtract(totalCost)
                        .divide(totalRevenue, 4, RoundingMode.HALF_UP)
                        .multiply(BigDecimal.valueOf(100))
                        .doubleValue();

        return new RevenueTrendResponse(totalRevenue, totalCost,
                Math.round(profitMargin * 10.0) / 10.0, trend);
    }

    /** Sales by product category. */
    public List<CategorySalesResponse> getSalesByCategory() {
        List<BillItem> items = billItemRepository.findByBillDateRange(
                LocalDateTime.of(2000,1,1,0,0), LocalDateTime.now());

        Map<String, BigDecimal> byCategory = new TreeMap<>();
        Map<String, Long> countByCategory  = new TreeMap<>();

        for (BillItem bi : items) {
            String cat = bi.getProduct().getCategory();
            byCategory.merge(cat, bi.getSubtotal(), BigDecimal::add);
            countByCategory.merge(cat, (long) bi.getQuantity(), Long::sum);
        }

        return byCategory.entrySet().stream()
                .map(e -> new CategorySalesResponse(e.getKey(), e.getValue(),
                        countByCategory.getOrDefault(e.getKey(), 0L)))
                .collect(Collectors.toList());
    }

    /** Customer trends — total, new this month, active (bought this month). */
    public CustomerTrendsResponse getCustomerTrends() {
        long total = customerRepository.count();
        LocalDateTime monthStart = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        long newThisMonth = customerRepository.countByCreatedAtAfter(monthStart);
        long active = billRepository.countDistinctCustomersByBillDateAfter(monthStart);
        return new CustomerTrendsResponse(total, newThisMonth, active);
    }
}
