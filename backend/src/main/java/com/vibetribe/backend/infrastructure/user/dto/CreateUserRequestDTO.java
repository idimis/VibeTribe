package com.vibetribe.backend.infrastructure.user.dto;

import com.vibetribe.backend.common.util.RandomStringGenerator;
import com.vibetribe.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequestDTO {
    private String name;
    private String email;
    private String password;
    private String photoProfileURL;
    private Boolean isOrganizer;

    public User toEntity(){
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setPhotoProfileURL(photoProfileURL);
        user.setReferralCode(RandomStringGenerator.generateRandomString(6));
        user.setPointsBalance(0L);
        user.setIsOrganizer(isOrganizer);
        return user;
    }
}
