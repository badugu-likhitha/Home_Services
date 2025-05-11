package com.hss.util;

import java.util.Random;

public class BookingIdGenerator {

    public static String generateBookingId() {
        Random random = new Random();
        return String.format("%05d", random.nextInt(100000)); // Generate a 5-digit random number
    }
}
