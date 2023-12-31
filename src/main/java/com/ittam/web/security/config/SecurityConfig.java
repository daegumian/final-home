package com.ittam.web.security.config;


import com.ittam.web.security.filter.CustomLoginFilter;
import com.ittam.web.security.filter.JwtAuthorizationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 비밀번호 암호화객체
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // 1. 기본 로그인 방식, 세션, 베이직인증, csrf토큰 전부 사용하지 않음
        http.csrf().disable();
        http.cors();
        http.formLogin().disable(); // form기반으로 로그인을 사용하지 않음
        http.httpBasic().disable(); // Authorization : 아이디 형식으로 넘어오는 basic인증을 사용하지 않음
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // 세션인증 기반을 사용하지 않고, JWT사용해서 인증

        http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // 모든 요청은 전부 허용

        // 1. 크로스오리진 필터 생성 cors
        http.cors(Customizer.withDefaults() );

        // 2. 필터체이닝 연습
        // http.addFilter(new FilterOne()); // 시큐리티 타입의 필터를 등록할 때
        // http.addFilterBefore(new FilterOne(), UsernamePasswordAuthenticationFilter.class);
        // http.addFilterBefore(new FilterTwo(), FilterOne.class); // filterOne 이전에 등록
        // http.addFilterAfter(new FilterTwo(), FilterOne.class); // filterOne 이후에 등록

        // 3. 로그인 시도에 AuthenticationManager가 필요합니다.
        // ++UserDetailService객체 and PasswordEncoder가 반드시 필요
        AuthenticationManager authenticationManager = authenticationManager(http.getSharedObject(AuthenticationConfiguration.class));

        // 4. 로그인 필터를 등록
        // http.addFilter(new CustomLoginFilter(authenticationManager));

        // 5. jwt 검증필터를 등록
        // http.addFilterBefore(new JwtAuthorizationFilter(authenticationManager), BasicAuthenticationFilter.class);
        // http.addFilter(new JwtAuthorizationFilter(authenticationManager));

        // 6. 요청별로 필터 실행시키기
        // login요청에만 CustomLoginFilter가 실행됩니다.
        http.requestMatchers()
                .antMatchers("/login")
                .and()
                .addFilter(new CustomLoginFilter(authenticationManager));

        // api로 시작하는 요청에만 jwt필터가 실행됩니다.
        http.requestMatchers()
                .antMatchers("/api/v1/**")
                .antMatchers("/api/v2/**")
                .and()
                .addFilter(new JwtAuthorizationFilter(authenticationManager));

        return http.build();
    }

    // 로그인 시도에 필요한 AuthenticationManager객체
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    // 크로스 오리진 필터
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // 모든 요청주소를 허용함
        configuration.setAllowedMethods(Arrays.asList("*")); // 모든 요청메서드를 허용함
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 요청에 대해서
        return source;
    }



}
