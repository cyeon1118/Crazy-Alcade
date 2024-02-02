package com.eni.backend.auth.oauth2.user;

import lombok.Builder;

import java.util.HashMap;
import java.util.Map;

public class KakaoOAuth2UserInfo implements OAuth2UserInfo {

    private final Map<String, Object> attributes;
    private final String accessToken;
    private final String id;
    private final String email;
    private final String name;
    private final String profile;

    @Builder
    private KakaoOAuth2UserInfo(String accessToken, Map<String, Object> attributes) {
        this.accessToken = accessToken;
        // attributes 맵의 kakao_account 키의 값에 실제 attributes 맵이 할당되어 있음
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");
        this.attributes = new HashMap<>();

        this.id = ((Long) attributes.get("id")).toString();

        this.email = (String) kakaoAccount.get("email");

        this.name = (String) kakaoAccount.get("name");

        this.profile = (String) kakaoProfile.get("profile");

        this.attributes.put("id", id);
        this.attributes.put("email", email);
        this.attributes.put("profile", profile);
    }

    public static KakaoOAuth2UserInfo of(String accessToken, Map<String, Object> attributes) {
        return builder()
                .accessToken(accessToken)
                .attributes(attributes)
                .build();
    }

    @Override
    public OAuth2Provider getProvider() {
        return OAuth2Provider.KAKAO;
    }

    @Override
    public String getAccessToken() {
        return accessToken;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getProfile() {
        return profile;
    }
}