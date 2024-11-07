package com.vibetribe.backend.infrastructure.user.controller;

import com.vibetribe.backend.common.response.ApiResponse;
import com.vibetribe.backend.infrastructure.user.dto.LoginRequestDTO;
import com.vibetribe.backend.usecase.auth.LoginUsecase;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final LoginUsecase loginUsecase;

    public AuthController(LoginUsecase loginUsecase) {
        this.loginUsecase = loginUsecase;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody LoginRequestDTO req) {
        return ApiResponse.successfulResponse("Login successful", loginUsecase.authenticateUser(req));
    }
}