import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, Image} from "react-native";
import SplashScreen from "react-native-splash-screen";
import Login from "./src/screens/Login";
import {styled} from "styled-components/native";
import logo_color3x from "./src/assets/images/waither-logo.png";
import {APPLE_LOGIN_COLOR, KAKAO_LOGIN_COLOR} from "./src/styles/color";
import {Dimensions} from "react-native";

const Wrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const Logo = styled.Image`
  top: 160px;
  position: absolute;
  width: 165px;
  height: 138px;
`;

const KakaoLoginBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${KAKAO_LOGIN_COLOR};
  width: 292px;
  height: 44px;
  border-radius: 10px;
  margin-bottom: 9px;
`;

const AppleLoginBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${APPLE_LOGIN_COLOR};
  width: 292px;
  height: 44px;
  border-radius: 10px;
`;

const LoginTitle = styled.Text`
  bottom: 80px;
  font-size: 22px;
`;

const KaKaoLoginTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
`;

const AppleLoginTitle = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 500;
`;

export default function App() {
  useEffect(() => {
    if (SplashScreen) {
      SplashScreen.hide();
    }
  }, []);
  return (
    <Wrapper>
      <Logo source={logo_color3x} />
      <LoginTitle>로그인</LoginTitle>
      <KakaoLoginBtn>
        <KaKaoLoginTitle>카카오로그인</KaKaoLoginTitle>
      </KakaoLoginBtn>
      <AppleLoginBtn>
        <AppleLoginTitle>Apple로 계속하기</AppleLoginTitle>
      </AppleLoginBtn>
    </Wrapper>
  );
}
