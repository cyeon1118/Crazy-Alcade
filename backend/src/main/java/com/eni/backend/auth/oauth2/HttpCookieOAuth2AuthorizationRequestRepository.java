package com.eni.backend.auth.oauth2;

import com.eni.backend.auth.oauth2.util.CookieUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * OAuth2 인증 과정중에 파리미터(state, redirect_uri) 저장해야함
 * -> 쿠키에 저장하기 위해 구현하는 클래스
 * 스프링 시큐리티 OAuth2 관련 필터(OAuth2AuthorizationRequestRedirectFilter, OAuth2LoginAuthenticationFilter)에서 인증 과정중 호출됨
 *
 * 프론트에서 로그인 요청시 리다이렉트할 OAuth2 제공자별 URL 정보 쿠키에 저장
 * -> 그 후 사용자가 로그인 성공시 백엔드로 리다이렉트 될때 인증 과정 및 사용자 정보 불러오기 완료 후 쿠키에 저장된 정보 삭제
 */
@RequiredArgsConstructor
@Component
public class HttpCookieOAuth2AuthorizationRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest>  {

    public static final String OAUTH2_AUTHORIZTION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
    public static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
    public static final String MODE_PARAM_COOKIE_NAME = "mode";
    public static final int COOKIE_EXPIE_SECONDS = 100;

    //쿠키에 저장된 oauth2_auth_request의 정보를 OAuth2AuthorizationRequest로 꺼낸다.
    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        return CookieUtils.getCookie(request, OAUTH2_AUTHORIZTION_REQUEST_COOKIE_NAME)
                .map(cookie -> CookieUtils.deserialize(cookie, OAuth2AuthorizationRequest.class))
                .orElse(null);
    }

    //oauth2_auth_request, redirect_uri, mode 쿠키에 저장
    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request, HttpServletResponse response) {

        if (authorizationRequest == null) {
            removeAuthorizationRequestCookies(request, response);
        }

        CookieUtils.addCookie(response,
                OAUTH2_AUTHORIZTION_REQUEST_COOKIE_NAME,
                CookieUtils.serialize(authorizationRequest),
                COOKIE_EXPIE_SECONDS);

        String redirectUriAfterLogin = request.getParameter(REDIRECT_URI_PARAM_COOKIE_NAME);
        if (StringUtils.hasText(redirectUriAfterLogin)) {
            CookieUtils.addCookie(response,
                    REDIRECT_URI_PARAM_COOKIE_NAME,
                    redirectUriAfterLogin,
                    COOKIE_EXPIE_SECONDS);
        }

        String mode = request.getParameter(MODE_PARAM_COOKIE_NAME);
        if (StringUtils.hasText(mode)) {
            CookieUtils.addCookie(response,
                    MODE_PARAM_COOKIE_NAME,
                    mode,
                    COOKIE_EXPIE_SECONDS);
        }
    }

    //Http 요청의 쿠키에 저장 했던 OAuth2AuthorizationRequest 객체 리턴
    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request, HttpServletResponse response) {

        return this.loadAuthorizationRequest(request);
    }

    //쿠키에 저장된 정보 삭제
    public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {

        CookieUtils.deleteCookie(request, response, OAUTH2_AUTHORIZTION_REQUEST_COOKIE_NAME);
        CookieUtils.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);
        CookieUtils.deleteCookie(request, response, MODE_PARAM_COOKIE_NAME);
    }
}
