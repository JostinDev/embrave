package com.embrave.appgateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) throws Exception {

        http.authorizeExchange(authorize -> authorize
                        .pathMatchers("/", "/error").permitAll()
                        .anyExchange().authenticated()
                )
                .oauth2Login(withDefaults())
                .csrf().disable();

        return http.build();
    }

}
