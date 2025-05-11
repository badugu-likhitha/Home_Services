package com.hss.controller;

import com.hss.model.Customer;
import com.hss.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request) {
        String mobileNumber = request.get("mobileNumber");
        String username = request.get("username");

        if (mobileNumber == null || mobileNumber.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mobile number is required"));
        }
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username is required"));
        }

        try {
            Customer newCustomer = loginService.registerUser(mobileNumber.trim(), username.trim());
            return ResponseEntity.ok(Map.of("message", "Signup successful", "data", newCustomer));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(Map.of("error", e.getMessage())); // Conflict error
        }
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String mobileNumber = request.get("mobileNumber");

        if (mobileNumber == null || mobileNumber.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mobile number is required"));
        }

        boolean isAuthenticated = loginService.authenticateUser(mobileNumber.trim());
        if (isAuthenticated) {
            return ResponseEntity.ok(Map.of("message", "Login successful"));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid mobile number")); // Unauthorized
        }
    }

    @GetMapping("/{mobileNumber}")
    public ResponseEntity<?> getUserDetails(@PathVariable String mobileNumber) {
        Customer customer = loginService.getUserByMobileNumber(mobileNumber);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }
}
