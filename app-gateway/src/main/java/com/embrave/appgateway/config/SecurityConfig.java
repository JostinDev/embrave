package com.embrave.appgateway.config;

import com.embrave.appgateway.ServerLogoutHandler;
import com.embrave.appgateway.security.Auth0CustomAuthorizationRequestResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.server.ServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    private final ReactiveClientRegistrationRepository clientRegistrationRepository;
    private final ServerLogoutHandler serverLogoutHandler;


    SecurityConfig(ReactiveClientRegistrationRepository clientRegistrationRepository, ServerLogoutHandler serverLogoutHandler) {
       this.clientRegistrationRepository = clientRegistrationRepository;
       this.serverLogoutHandler = serverLogoutHandler;
    }


    @Value("${auth0.audience}")
    private String audience;
    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) throws Exception {

        http.oauth2Login().authorizationRequestResolver(auth0AuthorizationRequestResolver(clientRegistrationRepository));
        http.logout(logoutSpec -> logoutSpec.logoutUrl("/logout").logoutHandler(this.serverLogoutHandler).logoutSuccessHandler());

        http.authorizeExchange(authorize -> authorize
                        .pathMatchers("/api/**").authenticated()
                        .pathMatchers("/api/challenge/**").permitAll()
                        .anyExchange().permitAll()
                )
                .csrf().disable();

        return http.build();
    }


    @Bean
    ServerOAuth2AuthorizationRequestResolver auth0AuthorizationRequestResolver(ReactiveClientRegistrationRepository reactiveClientRegistrationRepository) {
        return new Auth0CustomAuthorizationRequestResolver(audience, reactiveClientRegistrationRepository);
    }

}
