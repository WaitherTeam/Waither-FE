import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { RecoilRoot } from 'recoil';
import AskIntro from './src/screens/AskIntro';
import AskNotificationTime from './src/screens/AskNotificationTime';
import AskOutro from './src/screens/AskOutro';
import AskTimeZone from './src/screens/AskTimeZone';
import AskWeather from './src/screens/AskWeather';
import EmailLogin from './src/screens/EmailLogin';
import GreetNaming from './src/screens/GreetNaming';
import Greeting from './src/screens/Greeting';
import Login from './src/screens/Login';
import LoginReset from './src/screens/LoginReset';
import PasswordReset from './src/screens/PasswordReset';
import Register from './src/screens/Register';
import { toastConfig } from './src/utils/toastConfig';
import SettingWind from './src/screens/SettingWind';
import { MAIN_COLOR } from './src/styles/color';
import Settings from './src/screens/Settings';
import CompanySetting from './src/screens/CompanySetting';
import MainScreenSetting from './src/screens/MainScreenSetting';
import SettingNotification from './src/screens/SettingNotification';
import UserDataSetting from './src/screens/UserDataSetting';
import PrivacySetting from './src/screens/PrivacySetting';
import MainScreen from './src/screens/MainScreen';
import Notifications from './src/screens/Notifications';
import Report from './src/screens/Report';
import Web from './src/screens/Web';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BackgroundFetch from 'react-native-background-fetch';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';
import { AppState } from 'react-native';
import { getLocation } from './src/utils/geolocation';

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
  } catch (e) {
    console.log(e);
  }
}

export default function App() {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator();
  const [appState, setAppState] = useState(AppState.currentState);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  //-----------------------------------------
  useEffect(() => {
    if (SplashScreen) {
      SplashScreen.hide();
    }

    //-------------백그라운드 관련---------------------
    backgroundStart();
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      console.log('위치 업데이트됨:', location);
    }
  }, [location]);
  // -----------------현재 앱 상태 확인--------------------
  const handleAppStateChange = (nextAppState) => {
    console.log('현재 앱 상태:', nextAppState);
    setAppState(nextAppState);
  };
  // -----------------------------------------
  const backgroundStart = () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        forceAlarmManager: true,
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
        requiresCharging: false, //충전 필요시
        requiresDeviceIdle: false,
        requiresBatteryNotLow: false, //배터리가 낮으면 백그라운드 실행X
        requiresStorageNotLow: false, //저장공간이 낮으면 백그라운드 실행X
      },
      async (taskId) => {
        console.log('[js] 백그라운드 페치 이벤트 수신:', taskId);
        //-----------------------------------------
        switch (taskId) {
          case 'com.transistorsoft.fetch':
            requestPermission().then((result) => {
              if (result === 'granted') {
                getLocation();
              }
            });
            console.log('사용자 위치 전송, 백그라운드 성공');
            console.log('스케쥴 성공 후 위치 출력', location);
            break;
          default:
            console.log('기본 페치 작업');
            break;
        }
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log('[js] RNBackgroundFetch를 시작하지 못했습니다:', error);
      },
    );
    //-----------------------------------------
    BackgroundFetch.scheduleTask({
      taskId: 'com.transistorsoft.fetch',
      forceAlarmManager: true,
      delay: 1000,
      periodic: true,
    });

    console.log('백그라운드 작업 예약 완료');
    //-----------------------------------------
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch가 제한됨');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch가 거부됨');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch가 활성화되었습니다');
          break;
      }
    });
  };

  //==========================================================
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="EmailLogin" component={EmailLogin} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="LoginReset" component={LoginReset} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
            <Stack.Screen
              options={{ headerShown: true }}
              name="Greeting"
              component={Greeting}
            />
            <Stack.Screen name="GreetNaming" component={GreetNaming} />
            <Stack.Screen name="AskIntro" component={AskIntro} />
            <Stack.Screen name="AskWeather" component={AskWeather} />
            <Stack.Screen name="AskTimeZone" component={AskTimeZone} />
            <Stack.Screen
              name="AskNotificationTime"
              component={AskNotificationTime}
            />
            <Stack.Screen
              options={{ headerShown: true }}
              name="AskOutro"
              component={AskOutro}
            />
            <Stack.Screen
              name="SettingWind"
              options={{
                title: '바람 세기 설정',
                headerStyle: {
                  backgroundColor: MAIN_COLOR,
                },
                headerTintColor: '#fff',
              }}
              component={SettingWind}
            />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="CompanySetting" component={CompanySetting} />
            <Stack.Screen
              name="MainScreenSetting"
              component={MainScreenSetting}
            />
            <Stack.Screen
              name="SettingNotification"
              component={SettingNotification}
            />
            <Stack.Screen
              name="UserDataSetting"
              options={{
                headerShown: false,
              }}
              component={UserDataSetting}
            />
            <Stack.Screen name="PrivacySetting" component={PrivacySetting} />
            <Stack.Screen
              options={{ headerShown: false }}
              name="MainScreen"
              component={MainScreen}
            />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen
              name="Report"
              options={{
                headerShown: false,
              }}
              component={Report}
            />
            <Stack.Screen
              name="Web"
              options={{
                headerShown: true,
              }}
              component={Web}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
