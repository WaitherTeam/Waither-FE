//------------userPerception 정제 함수----------------
//num을 enum으로 저장해서 관리 -> 유지보수 향상
export const refiningUserPerception = (num: number, percent: number) => {
  if (num == null) {
    return '유저들의 답변이 부족합니다.';
  }
  if (num == 1) {
    return `전체 유저의 ${percent}%가\n오늘 날씨를 매우 춥다고 답변했습니다.`;
  }
  if (num == 2) {
    return `전체 유저의 ${percent}%가\n오늘 날씨를 춥다고 답변했습니다.`;
  }
  if (num == 3) {
    return `전체 유저의 ${percent}%가\n오늘 날씨를 보통이라고 답변했습니다.`;
  }
  if (num == 4) {
    return `전체 유저의 ${percent}%가\n오늘 날씨를 덥다고 답변했습니다.`;
  }
  if (num == 5) {
    return `전체 유저의 ${percent}%가\n오늘 날씨를 매우 덥다고 답변했습니다.`;
  }
};

//--------------advice 정제 함수-------------------
const removeSpacesAfterDot = (text) => {
  return text.replace(/\. +/g, '.');
};

export const refiningAdvice = (advices: object) => {
  var advice = '';
  //2개의 중요 조언만
  for (let i = 0; i < 2; i++) {
    advice += removeSpacesAfterDot(advices[i]);
  }
  const adviceArr = advice.split('.');
  adviceArr.pop();
  return adviceArr;
};

//-------------날짜 처리-------------------
export function FormattedDate() {
  const time = new Date();
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const day = String(time.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}
