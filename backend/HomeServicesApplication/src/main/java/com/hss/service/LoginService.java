package com.hss.service;

import com.hss.model.Customer;
import com.hss.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private CustomerRepository customerRepository;

    // Register a new user
    public Customer registerUser(String mobileNumber, String username) {
        Optional<Customer> existingMobileUser = customerRepository.findByMobileNumber(mobileNumber);
        if (existingMobileUser.isPresent()) {
            throw new IllegalArgumentException("User already exists with this mobile number");
        }

        Optional<Customer> existingUsernameUser = customerRepository.findByUsername(username);
        if (existingUsernameUser.isPresent()) {
            throw new IllegalArgumentException("Username already taken");
        }

        Customer customer = new Customer();
        customer.setMobileNumber(mobileNumber);
        customer.setUsername(username);
        return customerRepository.save(customer);
    }

    // Authenticate user for login
    public boolean authenticateUser(String mobileNumber) {
        Optional<Customer> existingCustomer = customerRepository.findByMobileNumber(mobileNumber);
        return existingCustomer.isPresent();
    }

    // Fetch user details by mobile number
    public Customer getUserByMobileNumber(String mobileNumber) {
        return customerRepository.findByMobileNumber(mobileNumber).orElse(null);
    }
}
