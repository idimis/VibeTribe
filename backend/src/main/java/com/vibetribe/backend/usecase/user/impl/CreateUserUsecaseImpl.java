package com.vibetribe.backend.usecase.user.impl;

import com.vibetribe.backend.entity.User;
import com.vibetribe.backend.infrastructure.user.dto.CreateUserRequestDTO;
import com.vibetribe.backend.infrastructure.user.repository.UserRepository;
import com.vibetribe.backend.usecase.user.CreateUserUsecase;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CreateUserUsecaseImpl implements CreateUserUsecase {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CreateUserUsecaseImpl(UserRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(CreateUserRequestDTO request) {
        User user = request.toEntity();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }
}
