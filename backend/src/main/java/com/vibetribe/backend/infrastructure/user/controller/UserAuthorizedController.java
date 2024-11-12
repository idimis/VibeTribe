package com.vibetribe.backend.infrastructure.user.controller;

import com.vibetribe.backend.entity.User;
import com.vibetribe.backend.infrastructure.user.service.UserService;
import com.vibetribe.backend.infrastructure.security.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserAuthorizedController {

    private final UserService userService;

    @Autowired
    public UserAuthorizedController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/details")
    public ResponseEntity<User> getUserDetails() {
        Long userId = Claims.getUserIdFromJwt();
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
}
