import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, Image} from "react-native";
import SplashScreen from "react-native-splash-screen";
import Login from "./src/screens/Login";
import {styled} from "styled-components/native";
import waitherLogo from "./src/assets/images/waither-logo.png";
import KakaoLogo from "./src/assets/images/Kakao-logo.png";
import AppleLogo from "./src/assets/images/Apple-logo.png";
import {
  APPLE_LOGIN_COLOR,
  KAKAO_LOGIN_COLOR,
  MAIN_COLOR,
} from "./src/styles/color";

const Wrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const Logo = styled.Image`
  bottom: 5px;
  position: relative;
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
  margin-bottom: 60px;
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

const Wrapper2 = styled.View`
  flex-direction: row;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;

const EmailLoginBtn = styled.TouchableOpacity``;

const NotLoginBtn = styled.TouchableOpacity``;

const EmailLoginText = styled.Text`
  color: rgba(0, 0, 0, 0.5);
`;

const NotLoginText = styled.Text`
  color: rgba(0, 0, 0, 0.5);
`;

const DivideText = styled.Text`
  font-size: 17px;
  padding-bottom: 3px;
  color: rgba(0, 0, 0, 0.5);
  margin: 0px 5px;
`;

const NotUser = styled.Text`
  color: rgba(0, 0, 0, 0.5);
  margin-top: 45px;
  margin-bottom: 13px;
`;

const EmailRegister = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: transparent;
  width: 292px;
  height: 44px;
  border: 1.3px;
  border-color: ${MAIN_COLOR};
  border-radius: 10px;
`;

const EmailRegisterText = styled.Text`
  color: ${MAIN_COLOR};
  font-size: 15px;
  font-weight: 600;
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
      <Wrapper2>
        <EmailLoginBtn>
          <EmailLoginText>이메일 로그인</EmailLoginText>
        </EmailLoginBtn>
        <DivideText>|</DivideText>
        <NotLoginBtn>
          <NotLoginText>로그인 없이 계속하기</NotLoginText>
        </NotLoginBtn>
      </Wrapper2>
      <NotUser>아직 회원이 아니시라면</NotUser>
      <EmailRegister>
        <EmailRegisterText>이메일로 회원가입</EmailRegisterText>
      </EmailRegister>
    </Wrapper>
  );
}
