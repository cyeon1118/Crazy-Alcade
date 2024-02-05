package com.eni.backend.member.entity;

import com.eni.backend.auth.oauth2.user.OAuth2Provider;
import com.eni.backend.auth.oauth2.user.OAuth2UserInfo;
import com.eni.backend.code.entity.Code;
import com.eni.backend.common.entity.BaseTimeEntity;
import com.eni.backend.common.entity.Language;
import com.eni.backend.item.entity.MemberItem;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
@Getter
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long id;

    @Column(nullable = false, length = 20)
    private String email;

    @Enumerated(EnumType.STRING)
    private OAuth2Provider provider;

    @Column(nullable = false)
    private String socialId;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String profile;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer coin;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer exp;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Language lang;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer complaint;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp connectedAt;

    @OneToOne
    @JoinColumn(name = "level_id")
    private Level level;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Code> codes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<MemberItem> memberItems = new ArrayList<>();

    @Builder
    private Member(String email, OAuth2Provider provider, String socialId, String nickname) {
        this.email = email;
        this.socialId = socialId;
        this.provider = provider;
        this.nickname = nickname;
        this.connectedAt = Timestamp.valueOf(LocalDateTime.now());
        this.profile = "https://lwi.nexon.com/ca/common/info/character/cha1.png";
    }

    public static Member of(String email, OAuth2Provider provider, String socialId, String nickname) {
        return builder()
                .email(email)
                .provider(provider)
                .socialId(socialId)
                .nickname(nickname)
                .build();
    }

    public static Member from(OAuth2UserInfo info) {
        return builder()
                .nickname(info.getProvider().getRegistrationId() + info.getId())
                .socialId(info.getId())
                .provider(info.getProvider())
                .email(info.getEmail())
                .build();
    }

    public Member updateConnectedAt(Timestamp timestamp) {
        this.connectedAt = timestamp;
        return this;
    }
}