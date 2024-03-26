import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MAIN_COLOR } from '../styles/color';
import waitherLogo from '../assets/images/waither-logo.png';

interface IEmailLogin {
  email: string;
}

const LogoWrapper = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.View`
  width: 95%;
  flex: 0.45;
  align-items: center;
`;

const Logo = styled.Image`
  bottom: 5px;
  position: relative;
  width: 165px;
  height: 138px;
`;

const LoginTitle = styled.Text`
  margin-bottom: 60px;
  font-size: 22px;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const EmailTextForm = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
`;

const PasswordTextForm = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
  margin-top: 25px;
`;

const ForgotPassword = styled.Text`
  font-size: 15px;
  margin-top: 30px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  border-radius: 40px;
  background-color: ${MAIN_COLOR};
  justify-content: center;
  align-items: center;
`;

const LoginButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const EmailLogin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEmailLogin>();

  const [isPress, setIsPress] = useState(false);

  const onSubmit: SubmitHandler<IEmailLogin> = (data) => console.log(data);
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo source={waitherLogo} />
        <LoginTitle>로그인</LoginTitle>
      </LogoWrapper>
      <FormWrapper>
        <EmailTextForm
          placeholder="이메일"
          placeholderTextColor="#ced4da"
          onFocus={() => {
            setIsPress(true);
          }}
          style={{ borderBottomColor: isPress ? `${MAIN_COLOR}` : '#ced4da' }}
          onBlur={() => {
            setIsPress(false);
          }}
        ></EmailTextForm>
        <PasswordTextForm
          placeholder="비밀번호"
          placeholderTextColor="#ced4da"
          onFocus={() => {
            setIsPress(true);
          }}
          style={{ borderBottomColor: isPress ? `${MAIN_COLOR}` : '#ced4da' }}
          onBlur={() => {
            setIsPress(false);
          }}
        ></PasswordTextForm>
        <ForgotPassword>비밀번호를 잊으셨다면 ?</ForgotPassword>
      </FormWrapper>
      <LoginButton>
        <LoginButtonText>로그인하기</LoginButtonText>
      </LoginButton>
    </Wrapper>
  );
};

export default EmailLogin;
