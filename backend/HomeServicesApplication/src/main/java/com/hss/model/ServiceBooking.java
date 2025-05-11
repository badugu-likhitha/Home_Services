package com.hss.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "service_bookings")
public class ServiceBooking {

    @Id
    @Column(name = "booking_id", unique = true, nullable = false, length = 36) // Updated length for UUID compatibility
    private String bookingId;

    private String fullname;

    @Column(name = "mobile_number", nullable = false)
    private String mobileNumber;

    private String address;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    @Column(name = "date_of_service", nullable = false)
    private LocalDate dateOfService;

    @Column(name = "time_of_service", nullable = false)
    private LocalTime timeOfService;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "service_description")
    private String serviceDescription;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "booking_status", nullable = false)
    private String bookingStatus;

    // Getters and Setters
    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
        this.userId = mobileNumber;  // Ensuring userId is synchronized with mobileNumber
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public LocalDate getDateOfService() {
        return dateOfService;
    }

    public void setDateOfService(LocalDate dateOfService) {
        this.dateOfService = dateOfService;
    }

    public LocalTime getTimeOfService() {
        return timeOfService;
    }

    public void setTimeOfService(LocalTime timeOfService) {
        this.timeOfService = timeOfService;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getServiceDescription() {
        return serviceDescription;
    }

    public void setServiceDescription(String serviceDescription) {
        this.serviceDescription = serviceDescription;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
}
