package com.hss.controller;

import com.hss.model.ServiceBooking;
import com.hss.service.ServiceBookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class ServiceBookingController {

    private final ServiceBookingService service;

    public ServiceBookingController(ServiceBookingService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ServiceBooking> bookService(@RequestBody ServiceBooking serviceBooking) {
        ServiceBooking savedBooking = service.bookService(serviceBooking);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ServiceBooking>> getAllBookings() {
        return ResponseEntity.ok(service.getAllBookings());
    }

    @GetMapping("/user/{mobileNumber}")
    public ResponseEntity<List<ServiceBooking>> getBookingsByMobileNumber(@PathVariable String mobileNumber) {
        return ResponseEntity.ok(service.getBookingsByMobileNumber(mobileNumber));
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<ServiceBooking> getBookingById(@PathVariable String bookingId) {
        return ResponseEntity.ok(service.getBookingById(bookingId));
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable String bookingId) {
        try {
            service.deleteBookingById(bookingId);
            return ResponseEntity.ok("Booking cancelled successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error cancelling booking: " + e.getMessage());
        }
    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<ServiceBooking> updateBooking(@PathVariable String bookingId, @RequestBody ServiceBooking updatedBooking) {
        try {
            ServiceBooking updated = service.updateBooking(bookingId, updatedBooking);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
