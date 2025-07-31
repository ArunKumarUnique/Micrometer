package com.example.monitoringdemo.controller;

import com.example.monitoringdemo.service.MetricsService;
import io.micrometer.core.annotation.Counted;
import io.micrometer.core.annotation.Timed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class DemoController {

    @Autowired
    private MetricsService metricsService;

    private final Random random = new Random();

    @GetMapping("/hello")
    @Timed(value = "hello.requests", description = "Time taken to return hello")
    @Counted(value = "hello.requests.count", description = "Number of hello requests")
    public ResponseEntity<Map<String, String>> hello() {
        // Simulate some processing time
        try {
            Thread.sleep(random.nextInt(100, 500));
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from Spring Boot with Monitoring!");
        response.put("timestamp", String.valueOf(System.currentTimeMillis()));
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/{id}")
    @Timed(value = "user.requests", description = "Time taken to get user")
    @Counted(value = "user.requests.count", description = "Number of user requests")
    public ResponseEntity<Map<String, Object>> getUser(@PathVariable Long id) {
        // Simulate database call delay
        try {
            Thread.sleep(random.nextInt(50, 200));
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Simulate occasional errors
        if (random.nextInt(10) == 0) {
            metricsService.incrementErrorCounter("user.not.found");
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> user = new HashMap<>();
        user.put("id", id);
        user.put("name", "User " + id);
        user.put("email", "user" + id + "@example.com");
        user.put("active", random.nextBoolean());

        return ResponseEntity.ok(user);
    }

    @PostMapping("/orders")
    @Timed(value = "order.creation", description = "Time taken to create order")
    @Counted(value = "order.creation.count", description = "Number of order creation requests")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> orderData) {
        // Simulate order processing
        try {
            Thread.sleep(random.nextInt(200, 800));
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Simulate validation errors
        if (random.nextInt(5) == 0) {
            metricsService.incrementErrorCounter("order.validation.failed");
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid order data"));
        }

        metricsService.recordOrderValue(random.nextDouble(10.0, 1000.0));

        Map<String, Object> order = new HashMap<>();
        order.put("orderId", random.nextLong(1000, 9999));
        order.put("status", "CREATED");
        order.put("timestamp", System.currentTimeMillis());
        order.put("items", orderData.getOrDefault("items", "[]"));

        return ResponseEntity.ok(order);
    }

    @GetMapping("/health-check")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "monitoring-demo");
        status.put("version", "1.0.0");
        return ResponseEntity.ok(status);
    }

    @GetMapping("/simulate-load")
    public ResponseEntity<Map<String, String>> simulateLoad() {
        // Simulate high CPU usage
        long start = System.currentTimeMillis();
        while (System.currentTimeMillis() - start < 1000) {
            Math.random();
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Load simulation completed");
        return ResponseEntity.ok(response);
    }
}