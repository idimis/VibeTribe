package com.vibetribe.backend.infrastructure.user.service;

import com.vibetribe.backend.common.util.RandomStringGenerator;
import com.vibetribe.backend.entity.User;
import com.vibetribe.backend.infrastructure.user.dto.CreateUserRequestDTO;
import com.vibetribe.backend.infrastructure.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Default profile icon URL from an open-source website
    private static final String DEFAULT_PROFILE_ICON_URL = "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000";


    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User createUser(CreateUserRequestDTO createUserRequestDTO) {
        // Validate the role
        if (!createUserRequestDTO.getRole().equalsIgnoreCase("customer") &&
                !createUserRequestDTO.getRole().equalsIgnoreCase("organizer")) {
            throw new IllegalArgumentException("Invalid role specified");
        }

        // Map DTO to Entity
        User user = new User();
        user.setName(createUserRequestDTO.getName());
        user.setEmail(createUserRequestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(createUserRequestDTO.getPassword()));
        user.setRole(createUserRequestDTO.getRole());
        user.setReferralCode(RandomStringGenerator.generateRandomString(6));

        // Set the photo profile URL or default if not provided
        user.setPhotoProfileUrl(createUserRequestDTO.getPhotoProfileUrl() != null ?
                createUserRequestDTO.getPhotoProfileUrl() : DEFAULT_PROFILE_ICON_URL);

        // Set optional fields for organizers
        if ("organizer".equalsIgnoreCase(createUserRequestDTO.getRole())) {
            user.setReferralCode(null);
            user.setWebsite(createUserRequestDTO.getWebsite());
            user.setPhoneNumber(createUserRequestDTO.getPhoneNumber());
            user.setAddress(createUserRequestDTO.getAddress());
        }

        // Save the user entity
        return userRepository.save(user);
    }
}

