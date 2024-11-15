package com.vibetribe.backend.infrastructure.user.service;

import com.vibetribe.backend.common.util.ReferralCodeGenerator;
import com.vibetribe.backend.entity.User;
import com.vibetribe.backend.infrastructure.user.dto.CreateUserRequestDTO;
import com.vibetribe.backend.infrastructure.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ReferralService referralService;

    private static final String DEFAULT_PROFILE_ICON_URL = "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000";

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, ReferralService referralService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.referralService = referralService;
    }

    @Transactional
    public User createUser(CreateUserRequestDTO createUserRequestDTO) {
        validateRole(createUserRequestDTO.getRole());

        User user = mapToUserEntity(createUserRequestDTO);
        User savedUser = userRepository.save(user);

        // Handle referral code if provided
        if (createUserRequestDTO.getReferralCode() != null) {
            referralService.handleReferral(createUserRequestDTO.getReferralCode(), savedUser);
        }

        return savedUser;
    }

    private void validateRole(String role) {
        if (!role.equalsIgnoreCase("customer") && !role.equalsIgnoreCase("organizer")) {
            throw new IllegalArgumentException("Invalid role specified");
        }
    }

    private User mapToUserEntity(CreateUserRequestDTO createUserRequestDTO) {
        User user = new User();
        user.setName(createUserRequestDTO.getName());
        user.setEmail(createUserRequestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(createUserRequestDTO.getPassword()));
        user.setRole(createUserRequestDTO.getRole());
        user.setReferralCode(ReferralCodeGenerator.generateReferralCode(createUserRequestDTO.getEmail()));

        // Set default profile icon if not provided
        user.setPhotoProfileUrl(createUserRequestDTO.getPhotoProfileUrl() != null ?
                createUserRequestDTO.getPhotoProfileUrl() : DEFAULT_PROFILE_ICON_URL);

        // Set additional fields for organizer
        if ("organizer".equalsIgnoreCase(createUserRequestDTO.getRole())) {
            user.setReferralCode(null);
            user.setWebsite(createUserRequestDTO.getWebsite());
            user.setPhoneNumber(createUserRequestDTO.getPhoneNumber());
            user.setAddress(createUserRequestDTO.getAddress());
        }

        return user;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
}