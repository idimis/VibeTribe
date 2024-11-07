package com.vibetribe.backend.usecase.user;

import com.vibetribe.backend.entity.User;
import com.vibetribe.backend.infrastructure.user.dto.CreateUserRequestDTO;

public interface CreateUserUsecase {
    User createUser(CreateUserRequestDTO request);
}
