package com.zalbit.app.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "zalbit")
public record AppProperties(String jwtSecret, String adminUsername, String adminPassword, String uploadDir) {}
