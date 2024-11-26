package com.vibetribe.backend.infrastructure.usecase.user.controller;

import com.vibetribe.backend.common.response.ApiResponse;
import com.vibetribe.backend.entity.User;
import com.vibetribe.backend.infrastructure.usecase.user.service.UserService;
import com.vibetribe.backend.infrastructure.system.security.Claims;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserAuthorizedController {

    private final UserService userService;

    public UserAuthorizedController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/details")
    public ResponseEntity<?> getUserDetails() {
        Long userId = Claims.getUserIdFromJwt();
        User user = userService.getUserById(userId);
        return ApiResponse.successfulResponse("Get user details success", user);
    }
}
