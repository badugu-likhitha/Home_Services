package com.hss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class HomeservicesApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // This makes sure your WAR is deployable to external Tomcat
        return builder.sources(HomeservicesApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(HomeservicesApplication.class, args);
    }
}
