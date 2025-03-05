import React, { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import NotificationIcon from '../assets/images/ic-main-noti-unread.svg';
import SettingIcon from '../assets/images/ic-main-settings.svg';
import RainIcon from '../assets/images/ic_rain.svg';
import SunIcon from '../assets/images/ic_sunny.svg';
import RainWithCloudIcon from '../assets/images/ic-weather-rain.svg';
import SunnyIcon from '../assets/images/ic-weather-sunny.svg';
import NightCloudIcon from '../assets/images/ic-weather-night-cloudy.svg';
import NightClearIcon from '../assets/images/ic-weather-night-clear.svg';
import NightRainIcon from '../assets/images/ic-weather-night-rainy.svg';
import NightSnowIcon from '../assets/images/ic-weather-snow.svg';
import AfternoonSnowIcon from '../assets/images/ic-weather-snownabitcloudy.svg';
import SnowIcon from '../assets/images/ic-weather-snow.svg';
import WaitherIcon from '../assets/images/ic-ask-databox_no_shadow.svg';
import GpsIcon from '../assets/images/ic_gps.svg';
import TemIcon from '../assets/images/ic_tem.svg';
import WindIcon from '../assets/images/ic_wind.svg';
import CloudIcon from '../assets/images/ic_cloud.svg';
import FineDustIcon from '../assets/images/ic_finedust.svg';
import ShowerIcon from '../assets/images/ic-shower.svg';
import CloudyIcon from '../assets/images/ic-cloudy.svg';
import RainyCloudyIcon from '../assets/images/ic-weather-rainy.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, NavigationProp } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { userNameState } from '../recoil/userInitInfoRecoil';
import { useSuspenseQuery } from '@tanstack/react-query';
import { currentLocationGet, mainWeatherGet, reportGet } from '../api';
import { RefreshControl } from 'react-native';
import {
  asTimeBackgroundColor,
  currentTime,
  getWindDirection,
  hourlyWeatherData,
  hourlyWeatherIcon,
  isRainy,
  isWhenRainy,
  isWhenRainyStop,
  rainyCheck,
  refiningMainAdvice,
} from '../utils/FormatData/mainFormatData';
import { getLocation } from '../utils/geolocation';
import { refiningAdvice } from '../utils/FormatData/reportFormatData';

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const MainScrollView = styled.ScrollView`
  width: 100%;
  flex: 1;
`;

const MainHeader = styled.View`
  margin-top: 58px;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const MainHeaderLeft = styled.View`
  width: 33%;
`;

const MainHeaderCenter = styled.View`
  width: 33%;
  align-items: center;
`;

const MainHeaderText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const MainHearderRight = styled.View`
  width: 33%;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 17px;
`;

const MainHeaderRightIconView = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
`;

const MainInfoView = styled.View`
  flex-direction: column;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: visible;
`;

const MainAccentView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  background-color: rgba(81, 137, 246, 1);
  width: 343px;
  height: 92px;
  border-radius: 16px;
`;

const MainAccentIcon = styled.View`
  width: 70px;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
  margin-right: 10px;
`;

const MainAccentTextView = styled.View`
  flex-direction: column;
  width: 65%;
`;

const MainAccentTitle = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 2px;
`;

const MainAccentText = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 16px;
`;

const MainWeatherView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 343px;
  height: 156px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.15);
  margin-bottom: 12px;
`;

const MainWeatherInfoView = styled.View`
  flex-direction: column;
  margin-left: 25px;
`;

const MainWeatherLocationView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SunnyView = styled.View`
  padding-top: 340%;
  padding-right: 10%;
`;

const MainWeatherLocation = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 13px;
  margin-left: 3px;
`;

const MainWeatherTemView = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const MainWeatherTem = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 56px;
  margin-bottom: 10px;
`;

const MainWeatherTemDegree = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 35px;
`;

const MainWeatherMaxMinView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Divider = styled.View`
  height: 13px;
  width: 1px;
  background-color: white;
  margin: 0px 10px;
`;

const MainExtraWeatherTextDivider = styled.View`
  height: 13px;
  width: 1px;
  background-color: white;
  margin: 0px 5px;
`;

const MainWeatherMaxMinText = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 13px;
`;

const MainWeatherIconView = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  height: 85px;
  width: 118px;
`;

const MainExtraWeatherView = styled.View`
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 343px;
  height: 127px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.15);
`;

const MainExtraWeatherViewColumn = styled.View`
  width: 30%;
  align-items: center;
`;

const MainExtraWeatherTitleView = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 20px;
  border-radius: 99px;
  margin-bottom: 18px;
`;

const MainExtraWeatherTitle = styled.Text`
  color: white;
  font-size: 12px;
`;

const MainExtraWeatherInfoView = styled.View`
  flex-direction: row;
  margin-top: 13px;
  align-items: center;
`;

const MainExtraWeatherInfoText = styled.Text`
  color: white;
  font-size: 12px;
`;

const MainWeatherByHourScrollView = styled.ScrollView`
  width: 343px;
  height: 127px;
  overflow: visible;
`;

const MainWeatherByHourView = styled.View`
  width: 105%;
  height: 127px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  flex-direction: row;
  padding-left: 13px;
`;

const MainWeatherByHourColumn = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
`;

const MainWeatherByHourTitle = styled.Text`
  color: white;
  font-size: 15px;
  margin-bottom: 10px;
`;

const MainWeatherByHourTemperature = styled.Text`
  color: white;
  font-size: 15px;
  margin-bottom: 12px;
  margin-top: 7px;
`;

type Props = {
  navigation: NavigationProp<any>;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const [showWind, setShowWind] = useState(false);
  const [showPrecipitation, setShowPrecipitation] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [wDirection, setWDirection] = useState('');
  const [name, setName] = useRecoilState(userNameState);

  //----------------React Query-----------------
  const {
    isPending: isMainDataPending,
    error: mainDataError,
    data: mainData,
    refetch: mainDataRefetch,
    isFetching: isMainDataFetching,
    isLoading: isMainDataLoading,
  } = useSuspenseQuery({
    queryKey: ['mainData'],
    queryFn: mainWeatherGet,
    staleTime: 600000,
  });

  const {
    isPending: isLocationDataPending,
    error: locationDataError,
    data: locationData,
    refetch: isLocationDataRefetch,
    isFetching: isLocationDataFetching,
  } = useSuspenseQuery({
    queryKey: ['currentLocationData'],
    queryFn: currentLocationGet,
    staleTime: 600000,
  });

  const {
    isPending: isReportDataPending,
    error: reportDataError,
    data: reportData,
    refetch: reportDataRefetch,
    isFetching: isReportDataFetching,
  } = useSuspenseQuery({
    queryKey: ['reportData'],
    queryFn: reportGet,
    staleTime: 600000,
  });

  useEffect(() => {
    setWDirection(getWindDirection(mainData.result.windVector));
    rainyCheck(mainData.result.expectedPty);
    getLocation();
  }, []);

  //----------------------written by yeop----------------------
  const fetchUserSettings = async () => {
    const token = await AsyncStorage.getItem('accessToken'); // 토큰 가져오기

    try {
      const response = await fetch(
        'https://waither.shop/user/setting/display',
        {
          method: 'GET',
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      if (result.code === '200') {
        const { wind, precipitation, dust } = result.result;
        setShowWind(wind);
        setShowPrecipitation(precipitation);
        setShowDust(dust);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }

    try {
      const response = await fetch('https://waither.shop/user/setting/mypage', {
        method: 'GET',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.code === '200') {
        setName(result.result.nickname);
      }
    } catch (error) {
      console.error('Error fetching userName: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserSettings(); // 화면이 포커스를 받을 때마다 설정값을 새로 가져옴
    }, []),
  );

  //---------------------새로 고침-----------------------
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    mainDataRefetch();
    reportDataRefetch();
    isLocationDataRefetch();
    setIsRefreshing(false);
  };

  return (
    <Wrapper>
      <LinearGradient
        colors={asTimeBackgroundColor()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0416, 0.5188, 0.9765]}
        style={{ flex: 1, width: '100%' }}
      >
        <MainHeader>
          <MainHeaderLeft></MainHeaderLeft>
          <MainHeaderCenter>
            <MainHeaderText>NOW.</MainHeaderText>
          </MainHeaderCenter>
          <MainHearderRight>
            <MainHeaderRightIconView
              onPress={() => navigation.navigate('Notifications')}
            >
              <NotificationIcon height={44} />
            </MainHeaderRightIconView>
            <MainHeaderRightIconView
              onPress={() => navigation.navigate('Settings')}
            >
              <SettingIcon height={44} />
            </MainHeaderRightIconView>
          </MainHearderRight>
        </MainHeader>
        <MainScrollView
          scrollEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <MainInfoView>
            <MainAccentView onPress={() => navigation.navigate('Report')}>
              <MainAccentIcon>
                {isRainy ? <RainIcon height={43} width={65} /> : <SunIcon />}
              </MainAccentIcon>
              <MainAccentTextView>
                {/* main API 예상 강수량 이용*/}
                <MainAccentTitle>
                  {isRainy == true
                    ? '비가 오네요. 우산 챙기세요 !'
                    : '오늘은 비가 오지 않을 예정입니다!'}
                </MainAccentTitle>
                <MainAccentText>
                  {isRainy == true
                    ? `${isWhenRainy}시부터 비가 내려${`\n`}${isWhenRainyStop}시에 멈출 예정입니다!`
                    : '대체적으로 맑을 예정입니다!'}
                </MainAccentText>
              </MainAccentTextView>
            </MainAccentView>
            <MainAccentView onPress={() => navigation.navigate('Report')}>
              <MainAccentIcon>
                <WaitherIcon height={50} width={50} />
              </MainAccentIcon>
              <MainAccentTextView>
                <MainAccentTitle>
                  오늘은 {name}님에게 {reportData.result.advices[0]}
                </MainAccentTitle>
                {/* 레포트 처음으로 오는 advice */}
                <MainAccentText>
                  {reportData.result.advices.length == 1
                    ? '오늘의 날씨는 무난합니다!'
                    : `${refiningMainAdvice(reportData.result.advices)}`}
                </MainAccentText>
              </MainAccentTextView>
            </MainAccentView>
            <MainWeatherView>
              <MainWeatherInfoView>
                <MainWeatherLocationView>
                  <GpsIcon height={12} width={12} />
                  <MainWeatherLocation>
                    {locationData.documents[0].road_address.region_1depth_name +
                      ' ' +
                      locationData.documents[0].road_address.region_2depth_name}
                  </MainWeatherLocation>
                </MainWeatherLocationView>
                <MainWeatherTemView>
                  {/*  */}
                  <MainWeatherTem>{mainData.result.temp}</MainWeatherTem>
                  <MainWeatherTemDegree>°C</MainWeatherTemDegree>
                </MainWeatherTemView>
                <MainWeatherMaxMinView>
                  <TemIcon height={20} width={13} style={{ marginRight: 5 }} />
                  <MainWeatherMaxMinText>
                    {/*  */}
                    최저 {mainData.result.tempMin}°C
                  </MainWeatherMaxMinText>
                  <Divider />
                  <MainWeatherMaxMinText>
                    {/*  */}
                    최고 {mainData.result.tempMax}°C
                  </MainWeatherMaxMinText>
                </MainWeatherMaxMinView>
              </MainWeatherInfoView>
              <MainWeatherIconView>
                {/* 날씨가 맑으며 18시가 지났으면 night 버전 && pop이 50 이상이면 rainy */}
                {currentTime > 18 ? (
                  mainData.result.pop >= 50 ? (
                    <NightRainIcon />
                  ) : (
                    <NightClearIcon />
                  )
                ) : mainData.result.pop < 50 ? (
                  <SunnyIcon />
                ) : (
                  <RainWithCloudIcon />
                )}
              </MainWeatherIconView>
            </MainWeatherView>
            {/* 조건부 렌더링: 세 가지 설정이 모두 false일 때 MainExtraWeatherView를 숨깁니다. */}
            {(showWind || showPrecipitation || showDust) && (
              <MainExtraWeatherView>
                {showWind && (
                  <MainExtraWeatherViewColumn>
                    <MainExtraWeatherTitleView>
                      <MainExtraWeatherTitle>풍향/풍속</MainExtraWeatherTitle>
                    </MainExtraWeatherTitleView>
                    <WindIcon />
                    <MainExtraWeatherInfoView>
                      <MainExtraWeatherInfoText>
                        {wDirection}
                      </MainExtraWeatherInfoText>
                      <MainExtraWeatherTextDivider />
                      <MainExtraWeatherInfoText>
                        {mainData.result.windDegree}m/s
                      </MainExtraWeatherInfoText>
                    </MainExtraWeatherInfoView>
                  </MainExtraWeatherViewColumn>
                )}
                {showPrecipitation && (
                  <MainExtraWeatherViewColumn>
                    <MainExtraWeatherTitleView>
                      <MainExtraWeatherTitle>강수확률</MainExtraWeatherTitle>
                    </MainExtraWeatherTitleView>
                    <CloudIcon />
                    <MainExtraWeatherInfoView>
                      <MainExtraWeatherInfoText>
                        {/* 1이면은 비 0이면은 맑음 */}
                        {mainData.result.pop + '%'}
                      </MainExtraWeatherInfoText>
                    </MainExtraWeatherInfoView>
                  </MainExtraWeatherViewColumn>
                )}
                {/* {showDust && ( */}
                <MainExtraWeatherViewColumn>
                  <MainExtraWeatherTitleView>
                    <MainExtraWeatherTitle>습도</MainExtraWeatherTitle>
                  </MainExtraWeatherTitleView>
                  <FineDustIcon />
                  <MainExtraWeatherInfoView>
                    <MainExtraWeatherInfoText>
                      {mainData.result.humidity}%
                    </MainExtraWeatherInfoText>
                  </MainExtraWeatherInfoView>
                </MainExtraWeatherViewColumn>
                {/* )} */}
              </MainExtraWeatherView>
            )}
            <MainWeatherByHourScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <MainWeatherByHourView>
                {hourlyWeatherData(mainData, mainData.result.expectedTemp).map(
                  (data, index) => (
                    <MainWeatherByHourColumn key={index}>
                      <MainWeatherByHourTitle>
                        {data.time}
                      </MainWeatherByHourTitle>
                      {data.icon}
                      <MainWeatherByHourTemperature>
                        {data.temperature}
                      </MainWeatherByHourTemperature>
                    </MainWeatherByHourColumn>
                  ),
                )}
              </MainWeatherByHourView>
            </MainWeatherByHourScrollView>
          </MainInfoView>
        </MainScrollView>
      </LinearGradient>
    </Wrapper>
  );
};

export default MainScreen;
