package com.embrave.appgateway.config;

import com.embrave.appgateway.CustomAccessDeniedHandler;
import com.embrave.appgateway.CustomAuthenticationEntryPoint;
import com.embrave.appgateway.security.Auth0CustomAuthorizationRequestResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.server.ServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.HttpStatusServerEntryPoint;
import org.springframework.security.web.server.authentication.logout.RedirectServerLogoutSuccessHandler;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;


@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    private final ReactiveClientRegistrationRepository clientRegistrationRepository;


    SecurityConfig (ReactiveClientRegistrationRepository clientRegistrationRepository) {
       this.clientRegistrationRepository = clientRegistrationRepository;
    }


    @Value("${auth0.audience}")
    private String audience;
    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) throws Exception {

        http.oauth2Login().authorizationRequestResolver(auth0AuthorizationRequestResolver(clientRegistrationRepository));
        http.logout(logoutSpec -> logoutSpec.logoutUrl("/logout")
                .logoutSuccessHandler(logoutSuccessHandlerTest())
        );
        http.httpBasic(httpBasicSpec -> httpBasicSpec.authenticationEntryPoint(new HttpStatusServerEntryPoint(HttpStatus.UNAUTHORIZED)));

       http.exceptionHandling(exception -> exception.accessDeniedHandler(new CustomAccessDeniedHandler())
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint()));

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

    @Value("${spring.security.oauth2.client.provider.auth0.issuer-uri}")
    private String issuer;
    @Value("${spring.security.oauth2.client.registration.auth0.client-id}")
    private String clientId;


    @Bean
    public ServerLogoutSuccessHandler logoutSuccessHandlerTest() {
        // Change this as needed to URI where users should be redirected to after logout
        String returnTo = "http://localhost:8080/";

        // Build the URL to log the user out of Auth0 and redirect them to the home page.
        // URL will look like https://YOUR-DOMAIN/v2/logout?clientId=YOUR-CLIENT-ID&returnTo=http://localhost:3000
        String logoutUrl = UriComponentsBuilder
                .fromHttpUrl(issuer + "v2/logout?client_id={clientId}&returnTo={returnTo}")
                .encode()
                .buildAndExpand(clientId, returnTo)
                .toUriString();

        RedirectServerLogoutSuccessHandler handler = new RedirectServerLogoutSuccessHandler();
        handler.setLogoutSuccessUrl(URI.create(logoutUrl));
        return handler;
    }

}
