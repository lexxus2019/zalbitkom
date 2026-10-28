package com.zalbit.app;

import com.zalbit.app.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class ZalbitApplication {
    public static void main(String[] args) {
        SpringApplication.run(ZalbitApplication.class, args);
    }
}
