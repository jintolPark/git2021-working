import contactReducer, { addContact, initialContact } from "./contactSlice"
import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ContactItem } from "./contactSlice";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import api, { ContactItemRequest, ContactItemResponse } from "./contactApi";
import { AxiosResponse } from "axios";
//  saga action을 생성
// contact 를추가하는 action
export const requestAddContact = createAction<ContactItem>(
  `${contactReducer.name}/requestAddContact`);

// contact 를 가져오는 action
export const requestFetchContact = createAction(
  `${contactReducer.name}/requestFetchContact`
);
//  saga action을 처리
// 서버에 post로 데이터를 보내서 추가, 리덕스 state를 변경
function* addData(action: PayloadAction<ContactItem>) {
  yield console.log("--add Data--");
  yield console.log(action);

  const contactItemPayload = action.payload;

  const ContactItemRequest: ContactItemRequest = {
    name: contactItemPayload.name,
    phoneNum: contactItemPayload.phoneNum,
    email: contactItemPayload.email,
    description: contactItemPayload.description,
  };
  // rest api 에 post로 데이터 보냄
  const result: AxiosResponse<ContactItemResponse> = yield call(
    api.add,
    ContactItemRequest
  );
  // redux state로 변경
  const contactItem: ContactItem = {
    id: result.data.id,
    name: result.data.name,
    phoneNum: result.data.phoneNum,
    email: result.data.email,
    description: result.data.description,
    createdTime: result.data.createdTime,
  };
  // dispatcher과 같음
  yield put(addContact(contactItem));
}

function* fetchData() {
  yield console.log("--fetchData--");
  // 백엔드에서 데이터 받아옴
  const result: AxiosResponse<ContactItemResponse[]> = yield call(
    api.fetch
  );
  const contacts = result.data.map(
    (item) => ({
      id: item.id,
      name: item.name,
      phoneNum: item.phoneNum,
      email: item.email,
      description: item.description,
      createdTime: item.createdTime,
    } as ContactItem)
  );
  // state 초기화 reducer 실행
  yield put(initialContact(contacts))
}


// saga action 감지 하는부분
export default function* contactSaga() {
  // 동일한 타입의 액션은 모두 처리
  yield takeEvery(requestAddContact, addData);
  // 동일 타입의 액션 중에서 가장 마지막 액션만 처리, 이전액션 취소
  yield takeLatest(requestFetchContact, fetchData);
}

