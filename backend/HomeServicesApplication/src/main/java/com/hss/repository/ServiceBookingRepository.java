package com.hss.repository;

import com.hss.model.ServiceBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceBookingRepository extends JpaRepository<ServiceBooking, String> {
    List<ServiceBooking> findByMobileNumber(String mobileNumber);
}
