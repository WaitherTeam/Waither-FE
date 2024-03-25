import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MAIN_COLOR } from '../styles/color';

interface IEmailLogin {
  email: string;
}

const Wrapper = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const FormWrapper = styled.View`
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
`;

const EmailTextForm = styled.TextInput`
  font-size: 22px;
  padding: 5.5px 0px;
  width: 90%;
  border-color: #ced4da;
  border-bottom-width: 1px;
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
    </Wrapper>
  );
};

export default EmailLogin;
