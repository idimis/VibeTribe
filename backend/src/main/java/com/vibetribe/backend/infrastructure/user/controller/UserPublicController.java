package com.vibetribe.backend.infrastructure.user.controller;

import com.vibetribe.backend.common.response.ApiResponse;
import com.vibetribe.backend.entity.User;
import com.vibetribe.backend.infrastructure.user.dto.CreateUserRequestDTO;
import com.vibetribe.backend.usecase.user.CreateUserUsecase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserPublicController {
    private final CreateUserUsecase createUserUsecase;

    public UserPublicController(CreateUserUsecase createUserUsecase) {
        this.createUserUsecase = createUserUsecase;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody CreateUserRequestDTO request) {
        User createdUser = createUserUsecase.createUser(request);
        return ApiResponse.successfulResponse("Create new user success", createdUser);
    }
}
