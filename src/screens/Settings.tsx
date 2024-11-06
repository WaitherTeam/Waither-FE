import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { GREY_COLOR, MAIN_COLOR } from '../styles/color';
import settingBtn from '../assets/images/VectorArrow.png';
import Databox from '../assets/images/ic-ask-databox.svg';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: '#E0E1E4';
  flex: 1;
`;

const UserCustomSettingView = styled.View`
  flex: 0.15;
  flex-direction: row;
  width: 90%;
  border-radius: 8px;
  margin-top: 20px;
  background-color: white;
  align-items: center;
`;

const ToggleSwitch = styled.Switch`
  transform: scale(0.8);
  margin-right: 17px;
`;

const CustomServiceTitleView = styled.View`
  display: flex;
  justify-content: center;
  width: 70%;
  height: 100%;
  flex: 1;
  margin-left: 15px;
`;
const CustomServiceMainTitle = styled.Text`
  font-weight: 300;
  font-size: 15px;
  margin-bottom: 6px;
`;
const CustomServiceSubTitle = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;

const SettingMainTitle = styled.Text`
  font-weight: 300;
  font-size: 15px;
  margin-bottom: 6px;
`;
const SettingSubTitle = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;

const SettingsView = styled.View`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  background-color: white;
`;

const CompanySettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-top: 25px;
`;

const CompanySettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const CompanySettingInnerView = styled.View`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const NotificationSettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-top: 40px;
`;

const NotificationSettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const NotificationSettingInnerView = styled.View`
  display: flex;
  flex-direction: column;
  margin-right: 92px;
`;

const MainScreenSettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-top: 40px;
`;

const MainScreenSettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const MainScreenSettingInnerView = styled.View`
  display: flex;
  flex-direction: column;
  margin-right: 47px;
`;

const SettingArrow = styled.Image`
  transform: scale(0.5);
  margin-left: 20px;
`;

const PrivacySettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 0.17;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
`;

const PrivacySettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const PrivacySettingInnerView = styled.View`
  width: 80%;
  margin-top: 5px;
  margin-left: 20px;
  margin-right: 7px;
  flex-direction: column;
`;

const UserDataSettingView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 0.17;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
  /* margin-top:  */
`;

const UserDataSettingBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const UserDataSettingInnerView = styled.View`
  width: 80%;
  margin-top: 5px;
  margin-left: 20px;
  margin-right: 7px;
  flex-direction: column;
`;

const ModalView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  border-radius: 15px;
  width: 90%;
  height: 230px;
  background-color: white;
`;

const ModalText = styled.Text`
  font-size: 14px;
  font-weight: 200;
  margin: 3px 5px;
`;

const ModalBtnView = styled.View`
  width: 85%;
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-between;
`;

const ModalTurnOffBtn = styled.TouchableOpacity`
  background-color: ${GREY_COLOR};
  width: 48%;
  height: 42px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;
const ModalTurnOnBtn = styled.TouchableOpacity`
  background-color: ${MAIN_COLOR};
  width: 48%;
  height: 42px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const ModalTurnOffBtnText = styled.Text`
  color: black;
`;
const ModalTurnOnBtnText = styled.Text`
  color: white;
`;

const DataBoxView = styled.View`
  width: 100%;
  z-index: 1;
  justify-content: center;
  position: relative;
  align-items: center;
  top: 15px;
`;

const Settings = () => {
  const navigation = useNavigation();
  const [isCustomServiceEnabled, setIsCustomServiceEnabled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [forDeclineApiCall, setForDeclineApiCall] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSwitch = () => {
    // 이전 상태를 이용
    setIsCustomServiceEnabled((prevState) => !prevState);
    if (isCustomServiceEnabled) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      //1. 모달이 뜨지 않았을때 (false에서 true로 수정될 경우)
      //2. 모달이 떴을 경우 (true에서 false로 수정할 경우)
      //  1. true인 상태에서 다시 생각해볼게요 선택 시 forDeclineApiCall가 true가 되기 때문에 API가 호출되지 않음
      //  2. true인 상태에서 그래도 끌래요 선택 시 forDeclineApiCall가 false가 되기 때문에 API 호출
      if (!isModalVisible && !forDeclineApiCall) {
        customServiceEnabledPut();
      }
    }
  }, [isCustomServiceEnabled, isModalVisible]);

  //===================================================================

  //사용자 맞춤형 서비스 제공 여부 호출
  const customServiceEnabledPut = async () => {
    const url = 'https://waither.shop/user/setting/custom';
    const token = await AsyncStorage.getItem('accessToken');
    const accessToken = 'Bearer ' + token;

    const headers = {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      custom: isCustomServiceEnabled,
    });

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body,
      });
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }
      const res = await response.json();
      console.log('Put 함수', res, isCustomServiceEnabled);
    } catch (error) {
      console.error('Error fetching: 사용자 맞춤형 서비스 PUT ', error);
    }
  };

  const customServiceEnabledGet = async () => {
    const url = 'https://waither.shop/user/setting/custom';
    const token = await AsyncStorage.getItem('accessToken');
    const accessToken = 'Bearer ' + token;

    const headers = {
      Authorization: accessToken,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();

      setIsCustomServiceEnabled(res.result.custom);
      setIsLoading(true);
      console.log('Get 함수', res.result.custom);
    } catch (error) {
      console.error('Error fetching: 사용자 맞춤형 서비스 GET ', error);
    }
  };

  //===================================================================
  useEffect(() => {
    customServiceEnabledGet();
  }, []);
  //===================================================================

  return (
    <Wrapper>
      <UserCustomSettingView>
        <CustomServiceTitleView>
          <CustomServiceMainTitle>
            사용자 맞춤 서비스 제공
          </CustomServiceMainTitle>
          <CustomServiceSubTitle>
            사용자 데이터에 맞춰 정확한 데이터를 제공합니다.
          </CustomServiceSubTitle>
        </CustomServiceTitleView>

        <ToggleSwitch
          value={isCustomServiceEnabled}
          onValueChange={toggleSwitch}
          //toggle 활성화 여부에 따른 색상 설정
          trackColor={{ false: '#767577', true: `${MAIN_COLOR}` }}
        ></ToggleSwitch>
      </UserCustomSettingView>
      <Modal
        isVisible={isModalVisible}
        animationIn={'slideInUp'}
        animationOut={'bounceOutUp'}
        animationOutTiming={600}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
      >
        <DataBoxView>
          <Databox width={60} height={60}></Databox>
        </DataBoxView>

        <ModalView>
          <ModalText>해당 모드를 끄시면,</ModalText>
          <ModalText>재설문 알림이 전송되지 않지만</ModalText>
          <ModalText style={{ color: 'red' }}>
            기존 데이터가 모두 삭제되고
          </ModalText>
          <ModalText style={{ color: 'red' }}>
            더이상 사용자 맞춤 서비스를 사용하실 수 없어요.
          </ModalText>
          <ModalBtnView>
            <ModalTurnOffBtn
              onPress={() => {
                setIsCustomServiceEnabled(false);
                setModalVisible(false);
                setForDeclineApiCall(false);
              }}
            >
              <ModalTurnOffBtnText>그래도 끌래요.</ModalTurnOffBtnText>
            </ModalTurnOffBtn>
            <ModalTurnOnBtn
              onPress={() => {
                setIsCustomServiceEnabled(true);
                setModalVisible(false);
                setForDeclineApiCall(true);
              }}
            >
              <ModalTurnOnBtnText>다시 생각해볼게요.</ModalTurnOnBtnText>
            </ModalTurnOnBtn>
          </ModalBtnView>
        </ModalView>
      </Modal>
      <SettingsView>
        <CompanySettingView>
          <CompanySettingBtn
            onPress={() => navigation.navigate('CompanySetting')}
          >
            <CompanySettingInnerView>
              <SettingMainTitle>직장 지역 설정</SettingMainTitle>
              <SettingSubTitle>
                직장 지역을 설정하여, 해당 지역의 레포트를 받아 볼 수 있어요.
              </SettingSubTitle>
            </CompanySettingInnerView>
            <SettingArrow source={settingBtn}></SettingArrow>
          </CompanySettingBtn>
        </CompanySettingView>

        <NotificationSettingView>
          <NotificationSettingBtn
            onPress={() => navigation.navigate('SettingNotification')}
          >
            <NotificationSettingInnerView>
              <SettingMainTitle>알림 설정</SettingMainTitle>
              <SettingSubTitle>
                특정 예보를 키고 끄거나, 강도를 낮출 수 있어요
              </SettingSubTitle>
            </NotificationSettingInnerView>
            <SettingArrow source={settingBtn}></SettingArrow>
          </NotificationSettingBtn>
        </NotificationSettingView>

        <MainScreenSettingView>
          <MainScreenSettingBtn
            onPress={() => navigation.navigate('MainScreenSetting')}
          >
            <MainScreenSettingInnerView>
              <SettingMainTitle>메인 화면 날씨 상세 정보</SettingMainTitle>
              <SettingSubTitle>
                메인 화면에 표시되는 날씨 상세 정보를 변경할 수 있어요.
              </SettingSubTitle>
            </MainScreenSettingInnerView>
            <SettingArrow source={settingBtn}></SettingArrow>
          </MainScreenSettingBtn>
        </MainScreenSettingView>
      </SettingsView>
      <PrivacySettingView>
        <PrivacySettingBtn
          onPress={() => navigation.navigate('PrivacySetting')}
        >
          <PrivacySettingInnerView>
            <SettingMainTitle>개인정보 설정</SettingMainTitle>
            <SettingSubTitle>
              사용자 정보와 계정에 대해 변경할 수 있어요.
            </SettingSubTitle>
          </PrivacySettingInnerView>
          <SettingArrow source={settingBtn}></SettingArrow>
        </PrivacySettingBtn>
      </PrivacySettingView>

      <UserDataSettingView>
        <UserDataSettingBtn
          onPress={() => navigation.navigate('UserDataSetting')}
        >
          <UserDataSettingInnerView>
            <SettingMainTitle>사용자 데이터 설정</SettingMainTitle>
            <SettingSubTitle>
              사용자 맞춤 데이터를 수정할 수 있어요.
            </SettingSubTitle>
          </UserDataSettingInnerView>
          <SettingArrow source={settingBtn}></SettingArrow>
        </UserDataSettingBtn>
      </UserDataSettingView>
    </Wrapper>
  );
};

export default Settings;
