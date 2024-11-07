package com.vibetribe.backend.usecase.auth;

import com.vibetribe.backend.infrastructure.user.dto.LoginRequestDTO;
import com.vibetribe.backend.infrastructure.user.dto.LoginResponseDTO;

public interface LoginUsecase {
    LoginResponseDTO authenticateUser(LoginRequestDTO request);
}
