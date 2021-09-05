// global state(전역상태)  저장소

// 프론트엔드 statr: UI 처리 바뀌게하는 변수
//  -> 모달팝업 상태(보이고,안보이고), 연락처 목록 상태(10개보이고,5개보이고, 수정모드이고)

// 백엔드 state: 비즈니스 로직 처리기 바뀌게 하는 데이터
// -> 주문상태(주문요청, 결제 , 결제확인, 배송중, 배송완료)
// -> 승인 상태(제출, 검토중, 반려, 승인)

import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../domain/profile/profileSlice"
import photosReducer from "../domain/photo/PhotoSlice";
import ContactReducer from "../domain/contact/ContactSlice"
// global state 저장소 만듦 
// global state : profile, todo, contact...여러개 state가 있음
// ** 이러한 state 들은 다른 컴포넌트와 state가 공유됨
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    photo: photosReducer,
    contact: ContactReducer,
  },  // 각 state별로 처리함 reducer 목록
  devTools: true,  // 개발툴 사용여부
});

// typescript 에서는 몇가지 타입 선언을 해야함

//  root state 타입 정의
export type RootState = ReturnType<typeof store.getState>;

// distpatch 타입 정의
// dispatch 함수의 generic type
export type AppDispatch = typeof store.dispatch;