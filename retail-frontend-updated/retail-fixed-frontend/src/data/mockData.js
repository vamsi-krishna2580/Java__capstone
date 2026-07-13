// src/data/mockData.js
// -----------------------------------------------------------------------------
// Mock data used by the service layer (src/services/*) so the UI is fully
// functional out of the box. Replace the service implementations with real
// axios calls to the Java backend (see src/api/axiosInstance.js) when ready —
// the page components do not need to change as long as the returned shapes
// match.
// -----------------------------------------------------------------------------

export const roles = ['ADMIN', 'MANAGER', 'CASHIER'];

export const users = [
  { userId: 1, name: 'Asha Rao', email: 'admin@retail.com', password: 'admin123', role: 'ADMIN' },
  { userId: 2, name: 'Vikram Shah', email: 'manager@retail.com', password: 'manager123', role: 'MANAGER' },
  { userId: 3, name: 'Priya Nair', email: 'cashier@retail.com', password: 'cashier123', role: 'CASHIER' },
];

export const customers = [
  { customerId: 1, name: 'Ramesh Kumar', email: 'ramesh@example.com', phone: '9876543210', address: '12 MG Road, Chennai', registrationDate: '2025-01-12' },
  { customerId: 2, name: 'Sneha Patel', email: 'sneha@example.com', phone: '9876501234', address: '45 Park Street, Mumbai', registrationDate: '2025-02-20' },
  { customerId: 3, name: 'Arjun Mehta', email: 'arjun@example.com', phone: '9123456780', address: '7 Lake View, Bengaluru', registrationDate: '2025-03-05' },
  { customerId: 4, name: 'Divya Iyer', email: 'divya@example.com', phone: '9988776655', address: '88 Anna Salai, Chennai', registrationDate: '2025-04-18' },
  { customerId: 5, name: 'Karan Joshi', email: 'karan@example.com', phone: '9090909090', address: '21 Sector 5, Pune', registrationDate: '2025-05-30' },
];

export const products = [
  { productId: 1, productName: 'Basmati Rice 5kg', category: 'Groceries', brand: 'India Gate', price: 650, quantity: 120, supplier: 'AgroFresh Distributors', reorderLevel: 30 },
  { productId: 2, productName: 'Sunflower Oil 1L', category: 'Groceries', brand: 'Fortune', price: 180, quantity: 18, supplier: 'AgroFresh Distributors', reorderLevel: 25 },
  { productId: 3, productName: 'Wireless Mouse', category: 'Electronics', brand: 'Logitech', price: 999, quantity: 45, supplier: 'TechWorld Supplies', reorderLevel: 10 },
  { productId: 4, productName: 'Bluetooth Earbuds', category: 'Electronics', brand: 'boAt', price: 1499, quantity: 8, supplier: 'TechWorld Supplies', reorderLevel: 15 },
  { productId: 5, productName: 'Cotton T-Shirt', category: 'Apparel', brand: 'H&M', price: 599, quantity: 60, supplier: 'Fashion Hub', reorderLevel: 20 },
  { productId: 6, productName: 'Running Shoes', category: 'Apparel', brand: 'Nike', price: 3499, quantity: 5, supplier: 'Fashion Hub', reorderLevel: 12 },
  { productId: 7, productName: 'Toothpaste 100g', category: 'Personal Care', brand: 'Colgate', price: 95, quantity: 200, supplier: 'CarePlus Distributors', reorderLevel: 50 },
  { productId: 8, productName: 'Shampoo 340ml', category: 'Personal Care', brand: 'Dove', price: 320, quantity: 14, supplier: 'CarePlus Distributors', reorderLevel: 20 },
];

export const inventory = products.map((p) => ({
  inventoryId: p.productId,
  productId: p.productId,
  productName: p.productName,
  availableStock: p.quantity,
  threshold: p.reorderLevel,
  reorderQuantity: p.reorderLevel * 2,
  lastUpdated: '2026-06-12T10:30:00Z',
}));

export const inventoryHistory = [
  { id: 1, productId: 2, productName: 'Sunflower Oil 1L', change: -12, type: 'SALE', date: '2026-06-10' },
  { id: 2, productId: 4, productName: 'Bluetooth Earbuds', change: -7, type: 'SALE', date: '2026-06-11' },
  { id: 3, productId: 1, productName: 'Basmati Rice 5kg', change: +50, type: 'RESTOCK', date: '2026-06-09' },
  { id: 4, productId: 6, productName: 'Running Shoes', change: -10, type: 'SALE', date: '2026-06-08' },
  { id: 5, productId: 8, productName: 'Shampoo 340ml', change: -6, type: 'SALE', date: '2026-06-12' },
];

export const bills = [
  {
    billId: 1001,
    customerId: 1,
    customerName: 'Ramesh Kumar',
    billDate: '2026-06-12T09:15:00Z',
    items: [
      { productId: 1, productName: 'Basmati Rice 5kg', quantity: 2, unitPrice: 650, subtotal: 1300 },
      { productId: 7, productName: 'Toothpaste 100g', quantity: 3, unitPrice: 95, subtotal: 285 },
    ],
    tax: 79.25,
    discount: 50,
    totalAmount: 1614.25,
    paymentStatus: 'PAID',
  },
  {
    billId: 1002,
    customerId: 2,
    customerName: 'Sneha Patel',
    billDate: '2026-06-12T11:40:00Z',
    items: [
      { productId: 4, productName: 'Bluetooth Earbuds', quantity: 1, unitPrice: 1499, subtotal: 1499 },
    ],
    tax: 134.91,
    discount: 0,
    totalAmount: 1633.91,
    paymentStatus: 'PAID',
  },
  {
    billId: 1003,
    customerId: 3,
    customerName: 'Arjun Mehta',
    billDate: '2026-06-13T08:05:00Z',
    items: [
      { productId: 5, productName: 'Cotton T-Shirt', quantity: 2, unitPrice: 599, subtotal: 1198 },
      { productId: 3, productName: 'Wireless Mouse', quantity: 1, unitPrice: 999, subtotal: 999 },
    ],
    tax: 197.46,
    discount: 100,
    totalAmount: 2294.46,
    paymentStatus: 'PENDING',
  },
];

export const dashboardStats = {
  totalCustomers: customers.length,
  totalProducts: products.length,
  lowStockProducts: inventory.filter((i) => i.availableStock <= i.threshold).length,
  todaysSales: 2294.46,
  monthlyRevenue: 458320,
  predictedDemandAlerts: 3,
};

export const revenueTrend = [
  { date: '06-07', revenue: 32000 },
  { date: '06-08', revenue: 41000 },
  { date: '06-09', revenue: 38500 },
  { date: '06-10', revenue: 45200 },
  { date: '06-11', revenue: 39800 },
  { date: '06-12', revenue: 52600 },
  { date: '06-13', revenue: 21000 },
];

export const salesByCategory = [
  { category: 'Groceries', value: 35 },
  { category: 'Electronics', value: 28 },
  { category: 'Apparel', value: 22 },
  { category: 'Personal Care', value: 15 },
];

export const topProducts = [
  { productId: 1, productName: 'Basmati Rice 5kg', unitsSold: 240, revenue: 156000 },
  { productId: 4, productName: 'Bluetooth Earbuds', unitsSold: 95, revenue: 142405 },
  { productId: 6, productName: 'Running Shoes', unitsSold: 60, revenue: 209940 },
  { productId: 5, productName: 'Cotton T-Shirt', unitsSold: 180, revenue: 107820 },
  { productId: 3, productName: 'Wireless Mouse', unitsSold: 130, revenue: 129870 },
];

export const customerTrends = {
  newCustomers: 34,
  returningCustomers: 86,
  growthTrend: [
    { month: 'Jan', customers: 120 },
    { month: 'Feb', customers: 145 },
    { month: 'Mar', customers: 168 },
    { month: 'Apr', customers: 190 },
    { month: 'May', customers: 225 },
    { month: 'Jun', customers: 260 },
  ],
};

export const predictions = products.map((p) => {
  const avgMonthlySales = Math.round(p.quantity * (0.4 + Math.random() * 0.6));
  const predictedDemand = Math.round(avgMonthlySales * 1.15);
  const recommendedStock = Math.max(predictedDemand, p.reorderLevel * 2);
  return {
    productId: p.productId,
    productName: p.productName,
    currentStock: p.quantity,
    avgMonthlySales,
    predictedDemand,
    recommendedStock,
    reorderQuantity: Math.max(recommendedStock - p.quantity, 0),
  };
});

export const monthlySales = [
  { month: 'Jan', sales: 320000 },
  { month: 'Feb', sales: 298000 },
  { month: 'Mar', sales: 345000 },
  { month: 'Apr', sales: 372000 },
  { month: 'May', sales: 410000 },
  { month: 'Jun', sales: 458320 },
];

export const dailySalesHourly = [
  { hour: '9 AM', sales: 4200 },
  { hour: '10 AM', sales: 6800 },
  { hour: '11 AM', sales: 9100 },
  { hour: '12 PM', sales: 12400 },
  { hour: '1 PM', sales: 8700 },
  { hour: '2 PM', sales: 7300 },
  { hour: '3 PM', sales: 9800 },
  { hour: '4 PM', sales: 11200 },
  { hour: '5 PM', sales: 13500 },
];
