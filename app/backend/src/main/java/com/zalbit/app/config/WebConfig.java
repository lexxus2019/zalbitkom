package com.zalbit.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Загрузка статики и /uploads вынесена в StaticSpaConfig
@Configuration
public class WebConfig implements WebMvcConfigurer {
}
