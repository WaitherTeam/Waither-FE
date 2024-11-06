export const BASE_URL = 'https://waither.shop';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { canBeUsed } from '../node_modules/broadcast-channel/dist/es/methods/indexed-db';
const token = AsyncStorage.getItem('accessToken');
const accessToken = `Bearer ${token}`;

//===========settings============
//사용자 맞춤형 서비스 제공 여부 호출
export const customServiceEnabledGet = async () => {
  const url = 'https://waither.shop/user/setting/custom';
  // const token = await AsyncStorage.getItem('accessToken');
  // const accessToken = 'Bearer ' + token;

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
      console.log(response.status);
    }
    const res = await response.json();
    return res.result.custom;
  } catch (error) {
    console.error('Error fetching: 사용자 맞춤형 서비스 GET ', error);
  }
};

// const { isPending, error, data, isFetching } = useQuery({
//   queryKey: ['settingsData'],
//   queryFn: customServiceEnabledGet,
//   staleTime: Infinity,
// });
