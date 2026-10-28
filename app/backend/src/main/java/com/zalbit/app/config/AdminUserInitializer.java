package com.zalbit.app.config;

import com.zalbit.app.domain.AdminUser;
import com.zalbit.app.repo.AdminUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminUserInitializer {

    private static final Logger log = LoggerFactory.getLogger(AdminUserInitializer.class);

    @Bean
    public ApplicationRunner seedAdmin(AdminUserRepository users, PasswordEncoder encoder, AppProperties props) {
        return args -> users.findByUsername(props.adminUsername()).ifPresentOrElse(
                u -> log.info("admin user '{}' exists", u.getUsername()),
                () -> {
                    AdminUser u = new AdminUser();
                    u.setUsername(props.adminUsername());
                    u.setPasswordHash(encoder.encode(props.adminPassword()));
                    users.save(u);
                    log.info("created admin user '{}' (смени пароль через ADMIN_PASSWORD)", u.getUsername());
                });
    }
}
