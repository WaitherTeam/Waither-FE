import Geolocation from 'react-native-geolocation-service';

let latitude = null;
let longitude = null;
//-------------------현재 위치 받아오기------------------
export const getLocation = () => {
  Geolocation.getCurrentPosition(
    async (pos) => {
      (latitude = pos.coords.latitude), (longitude = pos.coords.longitude);

      console.log('위치 불러오가: ', location);
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true, //고정밀 위치 설정
      timeout: 5000, //5초안에 정보 습득 실패 시 재호출
      maximumAge: 60000, //10분 동안은 캐쉬된 위치 정보 허용
    },
  );
};
