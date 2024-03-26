import React, { useState } from 'react';
import styled from 'styled-components/native';
import waitherLogo from '../assets/images/waither-logo.png';
import { MAIN_COLOR } from '../styles/color';

const Wrapper = styled.View`
  flex-direction: column;
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
const RegisterTitle = styled.Text`
  margin-bottom: 60px;
  font-size: 22px;
`;

const EmailTextForm = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
`;

const DuplicationCheckBtn = styled.TouchableOpacity`
  border-radius: 30px;
  background-color: #ced4da;
  width: 60px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;
const DuplicationCheckTitle = styled.Text`
  color: white;
  font-size: 12px;
  position: relative;
`;

const EmailVerifyTitle = styled.Text`
  margin-top: 45px;
  right: 134px;
`;

const EmailVerifyDetailTitle = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 9px;
  right: 85px;
`;

const VerifyForm = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
`;

const VerifyBtn = styled.TouchableOpacity`
  border-radius: 30px;
  background-color: ${MAIN_COLOR};
  width: 60px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;
const VerifyTitle = styled.Text`
  color: white;
  font-size: 11.5px;
  position: relative;
`;

const RegisterCompleteBtn = styled.TouchableOpacity`
  background-color: #ced4da;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 6%;
  border-radius: 30px;
  position: fixed;
  top: 250px;
`;

const RegisterCompleteTitle = styled.Text`
  color: white;
  font-size: 17px;
`;

const Register = () => {
  const [EmailisPress, setEmailIsPress] = useState(false);
  const [VerifyisPress, setVerifyIsPress] = useState(false);
  return (
    <Wrapper>
      <Logo source={waitherLogo} />
      <RegisterTitle>회원가입</RegisterTitle>
      <EmailTextForm
        placeholder="이메일"
        placeholderTextColor="#ced4da"
        onFocus={() => {
          setEmailIsPress(true);
        }}
        style={{
          borderBottomColor: EmailisPress ? `${MAIN_COLOR}` : '#ced4da',
        }}
        onBlur={() => {
          setEmailIsPress(false);
        }}
      ></EmailTextForm>
      <DuplicationCheckBtn>
        <DuplicationCheckTitle>중복확인</DuplicationCheckTitle>
      </DuplicationCheckBtn>
      <EmailVerifyTitle>이메일 인증하기</EmailVerifyTitle>
      <EmailVerifyDetailTitle>
        입려하신 이메일로 발송된 인증번호를 입력해주세요.
      </EmailVerifyDetailTitle>
      <VerifyForm
        placeholder="비밀번호"
        placeholderTextColor="#ced4da"
        onFocus={() => {
          setVerifyIsPress(true);
        }}
        style={{
          borderBottomColor: VerifyisPress ? `${MAIN_COLOR}` : '#ced4da',
        }}
        onBlur={() => {
          setVerifyIsPress(false);
        }}
      ></VerifyForm>
      <VerifyBtn>
        <VerifyTitle>인증하기</VerifyTitle>
      </VerifyBtn>

      <RegisterCompleteBtn>
        <RegisterCompleteTitle>인증하기</RegisterCompleteTitle>
      </RegisterCompleteBtn>
    </Wrapper>
  );
};

export default Register;
