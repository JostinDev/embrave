package com.embrave.appgateway.config;

import com.embrave.appgateway.CustomAccessDeniedHandler;
import com.embrave.appgateway.CustomAuthenticationEntryPoint;
import com.embrave.appgateway.CustomAuthenticationSuccessHandler;
import com.embrave.appgateway.security.Auth0CustomAuthorizationRequestResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.config.GlobalCorsProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.server.ServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.HttpStatusServerEntryPoint;
import org.springframework.security.web.server.authentication.logout.RedirectServerLogoutSuccessHandler;
import org.springframework.security.web.server.authentication.logout.ServerLogoutSuccessHandler;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.ForwardedHeaderFilter;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;


@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Value("${spring.security.oauth2.client.provider.auth0.issuer-uri}")
    private String issuer;

    @Value("${spring.security.oauth2.client.registration.auth0.client-id}")
    private String clientId;

    @Value("${auth0.audience}")
    private String audience;

    @Value("${logoutReturnUrl}")
    private String logoutReturnUrl;
    private final ReactiveClientRegistrationRepository clientRegistrationRepository;


    SecurityConfig (ReactiveClientRegistrationRepository clientRegistrationRepository) {
       this.clientRegistrationRepository = clientRegistrationRepository;
    }

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) throws Exception {

        http.oauth2Login(oAuth2LoginSpec -> oAuth2LoginSpec
                .authorizationRequestResolver(auth0AuthorizationRequestResolver(clientRegistrationRepository)).authenticationSuccessHandler(new CustomAuthenticationSuccessHandler()));

        http.logout(logoutSpec -> logoutSpec.logoutUrl("/logout")
                .logoutSuccessHandler(logoutSuccessHandlerTest())
        );
        http.httpBasic(httpBasicSpec -> httpBasicSpec.authenticationEntryPoint(new HttpStatusServerEntryPoint(HttpStatus.UNAUTHORIZED)));

       http.exceptionHandling(exception -> exception.accessDeniedHandler(new CustomAccessDeniedHandler())
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint()));

        http.authorizeExchange(authorize -> authorize
                        .pathMatchers("/api/challenge/**").permitAll()
                        .pathMatchers("/api/**").authenticated()
                        .pathMatchers("/embrave/**").authenticated()
                        .anyExchange().permitAll()
                )
                .csrf(ServerHttpSecurity.CsrfSpec::disable);
        return http.build();
    }

    @Bean
    ServerOAuth2AuthorizationRequestResolver auth0AuthorizationRequestResolver(ReactiveClientRegistrationRepository reactiveClientRegistrationRepository) {
        return new Auth0CustomAuthorizationRequestResolver(audience, reactiveClientRegistrationRepository);
    }

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    @RefreshScope
    public CorsWebFilter corsWebFilter(CorsConfigurationSource corsConfigurationSource) {
        return new CorsWebFilter(corsConfigurationSource);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(GlobalCorsProperties globalCorsProperties) {
        var source = new UrlBasedCorsConfigurationSource();
        globalCorsProperties.getCorsConfigurations().forEach(source::registerCorsConfiguration);
        return source;
    }

    @Bean
    public ServerLogoutSuccessHandler logoutSuccessHandlerTest() {

        // Build the URL to log the user out of Auth0 and redirect them to the home page.
        // URL will look like https://YOUR-DOMAIN/v2/logout?clientId=YOUR-CLIENT-ID&returnTo=http://localhost:3000
        String logoutUrl = UriComponentsBuilder
                .fromHttpUrl(issuer + "v2/logout?client_id={clientId}&returnTo={returnTo}")
                .encode()
                .buildAndExpand(clientId, logoutReturnUrl)
                .toUriString();

        RedirectServerLogoutSuccessHandler handler = new RedirectServerLogoutSuccessHandler();
        handler.setLogoutSuccessUrl(URI.create(logoutUrl));
        return handler;
    }
}
