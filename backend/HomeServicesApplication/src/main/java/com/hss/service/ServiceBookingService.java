package com.hss.service;

import com.hss.model.ServiceBooking;
import com.hss.repository.ServiceBookingRepository;
import com.hss.util.BookingIdGenerator;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceBookingService {

    private final ServiceBookingRepository repository;

    public ServiceBookingService(ServiceBookingRepository repository) {
        this.repository = repository;
    }

    public ServiceBooking bookService(ServiceBooking serviceBooking) {
        if (serviceBooking.getBookingId() == null || serviceBooking.getBookingId().isEmpty()) {
            serviceBooking.setBookingId(BookingIdGenerator.generateBookingId());
        }
        return repository.save(serviceBooking);
    }

    public List<ServiceBooking> getAllBookings() {
        return repository.findAll();
    }

    public List<ServiceBooking> getBookingsByMobileNumber(String mobileNumber) {
        return repository.findByMobileNumber(mobileNumber);
    }

    public ServiceBooking getBookingById(String bookingId) {
        return repository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking ID not found: " + bookingId));
    }

    public void deleteBookingById(String bookingId) {
        if (repository.existsById(bookingId)) {
            repository.deleteById(bookingId);
        } else {
            throw new IllegalArgumentException("Booking ID not found: " + bookingId);
        }
    }

    public ServiceBooking updateBooking(String bookingId, ServiceBooking updatedBooking) {
        ServiceBooking existingBooking = getBookingById(bookingId);
        existingBooking.setFullname(updatedBooking.getFullname());
        existingBooking.setMobileNumber(updatedBooking.getMobileNumber());
        existingBooking.setAddress(updatedBooking.getAddress());
        existingBooking.setServiceName(updatedBooking.getServiceName());
        existingBooking.setDateOfService(updatedBooking.getDateOfService());
        existingBooking.setTimeOfService(updatedBooking.getTimeOfService());
        existingBooking.setServiceDescription(updatedBooking.getServiceDescription());
        existingBooking.setPaymentMethod(updatedBooking.getPaymentMethod());
        existingBooking.setBookingStatus(updatedBooking.getBookingStatus());
        return repository.save(existingBooking);
    }
}
