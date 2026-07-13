package com.retail.customer.service;

import com.retail.customer.dto.*;
import com.retail.customer.entity.Customer;
import com.retail.customer.repository.CustomerRepository;
import com.retail.exception.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    public CustomerService(CustomerRepository customerRepository) { this.customerRepository = customerRepository; }

    public CustomerResponse create(CustomerRequest request) {
        if (customerRepository.existsByEmail(request.getEmail()))
            throw new DuplicateResourceException("Email already exists: " + request.getEmail());
        Customer c = new Customer(); mapToEntity(c, request);
        return new CustomerResponse(customerRepository.save(c));
    }

    public Page<CustomerResponse> getAll(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        if (search != null && !search.isEmpty())
            return customerRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                    search, search, pageable).map(CustomerResponse::new);
        return customerRepository.findAll(pageable).map(CustomerResponse::new);
    }

    public CustomerResponse getById(Long id) { return new CustomerResponse(findOrThrow(id)); }

    public CustomerResponse update(Long id, CustomerRequest request) {
        Customer c = findOrThrow(id);
        if (!c.getEmail().equals(request.getEmail()) && customerRepository.existsByEmail(request.getEmail()))
            throw new DuplicateResourceException("Email already in use: " + request.getEmail());
        mapToEntity(c, request);
        return new CustomerResponse(customerRepository.save(c));
    }

    public void delete(Long id) { findOrThrow(id); customerRepository.deleteById(id); }
    public Customer findEntityById(Long id) { return findOrThrow(id); }

    private Customer findOrThrow(Long id) {
        return customerRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
    }
    private void mapToEntity(Customer c, CustomerRequest r) {
        c.setName(r.getName()); c.setEmail(r.getEmail());
        c.setPhone(r.getPhone()); c.setAddress(r.getAddress());
    }
}
