package com.example.demo.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfiguration {

    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/").permitAll() // Allow access to home page
                .anyRequest().authenticated() // Require authentication for all other requests
                .and()
            .formLogin() // Enable form based login
                .loginPage("/login") // Specify custom login page URL
                .permitAll() // Allow access to login page
                .and()
            .logout() // Enable logout
                .permitAll(); // Allow access to logout
    }
}