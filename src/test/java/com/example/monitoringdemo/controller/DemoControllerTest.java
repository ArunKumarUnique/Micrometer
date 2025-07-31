package com.example.monitoringdemo.controller;

import com.example.monitoringdemo.service.MetricsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DemoController.class)
class DemoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MetricsService metricsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testHelloEndpoint() throws Exception {
        mockMvc.perform(get("/api/hello"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Hello from Spring Boot with Monitoring!"))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    void testGetUserEndpoint() throws Exception {
        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("User 1"))
                .andExpect(jsonPath("$.email").value("user1@example.com"));
    }

    @Test
    void testCreateOrderEndpoint() throws Exception {
        Map<String, Object> orderData = new HashMap<>();
        orderData.put("items", "[\"item1\", \"item2\"]");

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(orderData)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").exists())
                .andExpect(jsonPath("$.status").value("CREATED"));
    }

    @Test
    void testHealthCheckEndpoint() throws Exception {
        mockMvc.perform(get("/api/health-check"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.service").value("monitoring-demo"))
                .andExpect(jsonPath("$.version").value("1.0.0"));
    }

    @Test
    void testSimulateLoadEndpoint() throws Exception {
        mockMvc.perform(get("/api/simulate-load"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Load simulation completed"));
    }
}