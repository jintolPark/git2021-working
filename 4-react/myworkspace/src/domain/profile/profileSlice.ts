import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { deflate } from "zlib";
import { bori } from "../../common/data";

//  redux store(리덕스 저장소)에 하나의 state 를 관리하고 처리할수있는 모듈
// slice 에는 state와 reducer가 있음
// reducer 는 state를 변경하는 함수

export interface ProfileState { 
  image: string | undefined;
  username: string | undefined;
}

// state 초기상태를 선언
const initialState: ProfileState ={ 
 image: bori,
 username: "Jinseok Park"
}

// slice를 생성
export const profileSlice = createSlice({
  name: "profile",  // slice의 이름(state의 이름)
  // initialState: initialState, 원래는 이렇게 들어갔어야함 
  initialState, // state 초기값
  // 함수명 (기존state변수명, action변수명) => {state 변경처리}
  reducers: {
    saveProfile: (state, action: PayloadAction<ProfileState>) => {
// immer 가 내장 되어있음 따라서 state 변수를 직접 제어함
const profile = action.payload;
state.image = profile.image;
state.username = profile.username;
  },
},     // state 변경함수 목록
});
// action creator 내보내기 -> 컴포넌트에서 사용하기 위함
// reducer 함수명에 맞는 action creator들을 createSlice할때 자동으로 생성함
export const { saveProfile } = profileSlice.actions;

// slice.reducer
// == state 변경함수 를 여러개를 가지고있는 객체
// ==reducer를 여러개 가지고 있는 객체
// reducer: {function..(), function..(), ....}
export default profileSlice.reducer;