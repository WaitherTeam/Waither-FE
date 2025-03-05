import React, { useState } from 'react';
import SunnyIcon from '../../assets/images/ic-weather-sunny.svg';
import NightCloudIcon from '../../assets/images/ic-weather-night-cloudy.svg';
import NightClearIcon from '../../assets/images/ic-weather-night-clear.svg';
import NightRainIcon from '../../assets/images/ic-weather-night-rainy.svg';
import NightSnowIcon from '../../assets/images/ic-weather-snow.svg';
import AfternoonSnowIcon from '../../assets/images/ic-weather-snownabitcloudy.svg';
import ShowerIcon from '../../assets/images/ic-shower.svg';
import CloudyIcon from '../../assets/images/ic-cloudy.svg';
import RainyCloudyIcon from '../../assets/images/ic-weather-rainy.svg';

const time = new Date();
export const currentTime = time.getHours() % 24;

//----------------시간대에 따른 배경 그레디언트 설정 함수----------------
export const asTimeBackgroundColor = () => {
  const testtime = 22;
  //낮 시간대
  if (currentTime >= 6 && currentTime < 15) {
    return [
      'rgba(143,169,160, 1)',
      'rgba(50,127,188, 1)',
      'rgba(22,115,187, 1)',
    ];
  }
  //노을 시간대
  if (currentTime >= 15 && currentTime < 18) {
    return [
      'rgba(179, 166, 155, 1)',
      'rgba(110, 131, 149, 1)',
      'rgba(118, 123, 127, 1)',
    ];
  }
  //밤 시간대
  else {
    return ['rgba(114,120,167,1)', 'rgba(23,60,90,1)', 'rgba(16,26,34,1)'];
  }
};

//------------풍향 각도에 따른 풍향 데이터 처리 함수---------------------------
export function getWindDirection(degrees: number) {
  if (
    (degrees >= 0 && degrees < 22.5) ||
    (degrees >= 337.5 && degrees <= 360)
  ) {
    return '북'; // North
  } else if (degrees >= 22.5 && degrees < 67.5) {
    return '북동'; // Northeast
  } else if (degrees >= 67.5 && degrees < 112.5) {
    return '동'; // East
  } else if (degrees >= 112.5 && degrees < 157.5) {
    return '남동'; // Southeast
  } else if (degrees >= 157.5 && degrees < 202.5) {
    return '남'; // South
  } else if (degrees >= 202.5 && degrees < 247.5) {
    return '남서'; // Southwest
  } else if (degrees >= 247.5 && degrees < 292.5) {
    return '서'; // West
  } else if (degrees >= 292.5 && degrees < 337.5) {
    return '북서'; // Northwest
  } else {
    return '잘못된 각도'; // Invalid angle
  }
}

//------------미래 날씨 예측 컴포넌트 데이터, 아이콘 포맷 함수--------------------
export const hourlyWeatherIcon = (
  i: number,
  time: number,
  expectedPty: object,
  expectedSky: object,
): React.JSX.Element => {
  //강수 없음, 구름많음
  if (expectedPty[i] == 0 && expectedSky[i] > 1) {
    //해가 떠 있을때
    if (currentTime > 6 && currentTime < 18) {
      return <CloudyIcon width={48} height={45} />;
    }
    //해가 떠 있지 않을때
    else {
      return <NightCloudIcon width={48} height={45} />;
    }
  }

  //강수 없음, 맑음
  if (expectedPty[i] == 0 && expectedSky[i] == 1) {
    //해가 떠 있을때
    if (currentTime > 6 && currentTime < 18) {
      return <SunnyIcon width={48} height={45} />;
    }
    //해가 떠 있지 않을때
    else {
      return <NightClearIcon width={48} height={45} />;
    }
  }
  //강수 있음, 맑음
  if (
    expectedPty[i] > 0 &&
    expectedPty[i] != 3 &&
    expectedPty[i] != 7 &&
    expectedSky[i] == 1
  ) {
    //해가 떠 있을때
    if (currentTime > 6 && currentTime < 18) {
      return <ShowerIcon width={48} height={45} />;
    }
    //해가 떠 있지 않을때
    else {
      return <NightRainIcon width={48} height={45} />;
    }
  }
  //강수 있음, 구름많음
  if (
    expectedPty[i] > 0 &&
    expectedPty[i] != 3 &&
    expectedPty[i] != 7 &&
    expectedSky[i] != 1
  ) {
    //해가 떠 있을때
    if (currentTime > 6 && currentTime < 18) {
      return <RainyCloudyIcon width={48} height={45} />;
    }
    //해가 떠 있지 않을때
    else {
      return <NightRainIcon width={48} height={45} />;
    }
  }
  //눈 있음
  if (expectedPty[i] == 3 || expectedPty[i] == 7) {
    //해가 떠 있을때
    if (currentTime > 6 && currentTime < 18) {
      return <AfternoonSnowIcon width={48} height={45} />;
    }
    //해가 떠 있지 않을때
    else {
      return <NightSnowIcon width={48} height={45} />;
    }
  }
};

//---------강수 여부 및 강수 시간 검사 및 처리 함수------------------------
export let isRainy = false;
export let isWhenRainy = 0;
export let isWhenRainyStop = 0;
export const rainyCheck = (expectedPty: object) => {
  let foundFirstRain = false;
  let foundFirstClear = false;

  for (let i = 0; i < expectedPty.length; i++) {
    if (!foundFirstRain && expectedPty[i] === '1') {
      isRainy = true;
      isWhenRainy = time.getHours() + i + 1;
      foundFirstRain = true;
    } else if (foundFirstRain && !foundFirstClear && expectedPty[i] === '0') {
      isWhenRainyStop = time.getHours() + i;
      foundFirstClear = true;
      break;
    }
  }
};

export const hourlyWeatherData = (data: object, expectedTemp: object) => {
  return [
    {
      time: currentTime + 1 + '시',
      icon: hourlyWeatherIcon(
        0,
        currentTime,
        data.result.expectedPty,
        data.result.expectedSky,
      ),
      temperature: expectedTemp[0] + '°C',
    },
    {
      time: currentTime + 2 + '시',
      icon: hourlyWeatherIcon(
        1,
        currentTime + 1,
        data.result.expectedPty,
        data.result.expectedSky,
      ),
      temperature: expectedTemp[1] + '°C',
    },
    {
      time: currentTime + 3 + '시',
      icon: hourlyWeatherIcon(
        2,
        currentTime + 1,
        data.result.expectedPty,
        data.result.expectedSky,
      ),
      temperature: expectedTemp[2] + '°C',
    },
    {
      time: currentTime + 4 + '시',
      icon: hourlyWeatherIcon(
        3,
        currentTime + 1,
        data.result.expectedPty,
        data.result.expectedSky,
      ),
      temperature: expectedTemp[3] + '°C',
    },
    {
      time: currentTime + 5 + '시',
      icon: hourlyWeatherIcon(
        4,
        currentTime + 1,
        data.result.expectedPty,
        data.result.expectedSky,
      ),
      temperature: expectedTemp[4] + '°C',
    },
    {
      time: currentTime + 1 + '시',
      icon: hourlyWeatherIcon(
        5,
        currentTime + 1,
        data.result.expectedPty,
        data.result.expectedSky,
      ),
      temperature: expectedTemp[5] + '°C',
    },
  ];
};

export const refiningMainAdvice = (advices: object) => {
  let notRefinedAdvice = advices[1];
  const refinedAdvice = notRefinedAdvice
    .split('.')
    .map((advice) => advice.trim())
    .filter((advice) => advice !== ''); //빈 문자열은 제거
  return refinedAdvice.join('.\n') + '.';
};
