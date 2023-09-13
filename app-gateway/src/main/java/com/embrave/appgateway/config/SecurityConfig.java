package com.embrave.appgateway.config;

import com.embrave.appgateway.security.Auth0CustomAuthorizationRequestResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.server.ServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Mono;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Value("${auth0.audience}")
    private String audience;
    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) throws Exception {

        ReactiveClientRegistrationRepository clientRegistrationRepository = null;

        http.oauth2Login().authorizationRequestResolver(auth0AuthorizationRequestResolver(clientRegistrationRepository));

        http.authorizeExchange(authorize -> authorize
                        .pathMatchers("/", "/error").permitAll()
                        .anyExchange().authenticated()
                )
                //.oauth2Login(withDefaults())
                .csrf().disable();

        return http.build();
    }

    @Bean
    ServerOAuth2AuthorizationRequestResolver auth0AuthorizationRequestResolver(ReactiveClientRegistrationRepository reactiveClientRegistrationRepository) {
        return new Auth0CustomAuthorizationRequestResolver(audience, reactiveClientRegistrationRepository);
    }

}
