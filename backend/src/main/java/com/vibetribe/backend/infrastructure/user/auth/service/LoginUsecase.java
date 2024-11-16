package com.vibetribe.backend.infrastructure.user.auth.service;

import com.vibetribe.backend.infrastructure.user.auth.dto.LoginRequestDTO;
import com.vibetribe.backend.infrastructure.user.auth.dto.LoginResponseDTO;

public interface LoginUsecase {
    LoginResponseDTO authenticateUser(LoginRequestDTO request);
}