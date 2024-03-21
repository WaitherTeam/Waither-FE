import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, Image} from "react-native";
import SplashScreen from "react-native-splash-screen";
import Login from "./src/screens/Login";
import {styled} from "styled-components/native";
import waitherLogo from "./src/assets/images/waither-logo.png";
import KakaoLogo from "./src/assets/images/Kakao-logo.png";
import AppleLogo from "./src/assets/images/Apple-logo.png";
import {APPLE_LOGIN_COLOR, KAKAO_LOGIN_COLOR} from "./src/styles/color";

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
  flex-direction: row;
  background-color: ${KAKAO_LOGIN_COLOR};
  width: 292px;
  height: 44px;
  border-radius: 10px;
  margin-bottom: 9px;
`;

const AppleLoginBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
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

const KakaoImage = styled.Image`
  width: 20px;
  height: 19px;
  margin-top: 3px;
  margin-right: 8px;
`;

const AppleImage = styled.Image`
  width: 23px;
  height: 23px;
  margin-bottom: 2px;
  margin-right: 8px;
`;

export default function App() {
  useEffect(() => {
    if (SplashScreen) {
      SplashScreen.hide();
    }
  }, []);
  return (
    <Wrapper>
      <Logo source={waitherLogo} />
      <LoginTitle>로그인</LoginTitle>
      <KakaoLoginBtn>
        <KakaoImage source={KakaoLogo} />
        <KaKaoLoginTitle>Kakao로 계속하기</KaKaoLoginTitle>
      </KakaoLoginBtn>
      <AppleLoginBtn>
        <AppleImage source={AppleLogo} />
        <AppleLoginTitle>Apple로 계속하기</AppleLoginTitle>
      </AppleLoginBtn>
    </Wrapper>
  );
}
