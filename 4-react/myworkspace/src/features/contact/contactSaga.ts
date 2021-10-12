import contactReducer, {
  addContact,
  ContactPage,
  initialCompleted,
  initialContact,
  initialContactNext,
  initialContactPaged,
  modifyContact,
  removeContact
} from "./contactSlice"
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ContactItem } from "./contactSlice";
import { call, put, select, takeEvery, takeLatest } from "@redux-saga/core/effects";
import api, { ContactItemRequest, ContactItemResponse, ContactPagingResponse } from "./contactApi";
import { AxiosResponse } from "axios";
import { endProgress, startProgress } from "../../components/progress/progressSlice";
import { addAlert } from "../../components/alert/alertSlice";
import { RootState } from "../../store";

export interface PageRequest {
  page: number;
  size: number;
}
//  saga action을 생성
// contact 를추가하는 action
export const requestAddContact = createAction<ContactItem>(
  `${contactReducer.name}/requestAddContact`);

  // 숫자 페이징 할때
  export const requestAddContactPaging = createAction<ContactItem>(
    `${contactReducer.name}/requestAddContactPaging`
  );
// 더보기 할때
  export const requestAddContactNext = createAction<ContactItem>(
    `${contactReducer.name}/requestAddContactNext`
  )

// contact 를 가져오는 action
export const requestFetchContact = createAction(
  `${contactReducer.name}/requestFetchContact`
);

// contact를 페이징으로 가져오는 action
export const requestFetchContactPaging = createAction<PageRequest>(
  `${contactReducer.name}/requestFetchContactPaging`
);

export const requestFetchContactNext = createAction<PageRequest>(
  `${contactReducer.name}/requestFetchContactNext`
);

// contact를 삭제하는 action   
export const requestRemoveContact = createAction<number>(
  `${contactReducer.name}/requestRemoveContact`
);

export const requestRemoveContactPaging = createAction<number>(
  `${contactReducer.name}/requestRemoveContactPaging`
);

export const requestRemoveContactNext = createAction<number>(
  `${contactReducer.name}/requestRemoveContactNext`
);

// contact를 수정하는 action
export const requestModifyContact = createAction<ContactItem>(
  `${contactReducer.name}/requestModifyContact`
)
//  saga action을 처리
// 서버에 post로 데이터를 보내서 추가, 리덕스 state를 변경
function* addDataPaging(action: PayloadAction<ContactItem>) {
  yield console.log("--add DataPaging--");
  yield console.log(action);
  try {
    const contactItemPayload = action.payload;

    const ContactItemRequest: ContactItemRequest = {
      name: contactItemPayload.name,
      phoneNum: contactItemPayload.phoneNum,
      email: contactItemPayload.email,
      description: contactItemPayload.description,
    };
    yield put(startProgress());
    // rest api 에 post로 데이터 보냄
    const result: AxiosResponse<ContactItemResponse> = yield call(
      api.add,
      ContactItemRequest
    );
    yield put(endProgress());
    // redux state로 변경
    const contactData: ContactItem[] = yield select(
      (state: RootState) => state.contact.data
    );
    if (contactData.length > 0) {
      const deleteId = contactData[contactData.length - 1].id;
      yield put(removeContact(deleteId));
    }
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
    yield put(initialCompleted());
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
    );
  } catch (e: any) {
    yield put(endProgress());
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}
function* addDataNext(action: PayloadAction<ContactItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

try {
  const contactItemPayload = action.payload;

  const contactItemRequest: ContactItemRequest={
    name: contactItemPayload.name,
    phoneNum: contactItemPayload.phoneNum,
    email: contactItemPayload.email,
    description: contactItemPayload.description,
  };
  yield put(startProgress());

  const result: AxiosResponse<ContactItemResponse> = yield call(
    api.add,
    contactItemRequest
  );
  yield put(endProgress());
  const contactItem: ContactItem = {
    id: result.data.id,
    name: result.data.name,
    phoneNum: result.data.phoneNum,
    email: result.data.email,
    description: result.data.description,
    createdTime: result.data.createdTime,
  };
  yield put(addContact(contactItem));
  yield put(initialCompleted());

  yield put(
    addAlert({id: nanoid(), variant: "success", message: "저장되었습니다."})
  );
} catch(e: any) {
  yield put(endProgress());
  yield put(
    addAlert({ id: nanoid(), variant: "danger", message: e.message})
  );
}
}

function* fetchData() {
  yield console.log("--fetchData--");
  yield put(startProgress());
  // 백엔드에서 데이터 받아옴
  const result: AxiosResponse<ContactItemResponse[]> = yield call(
    api.fetch
  );
  yield put(endProgress());
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

function* fetchDataPaging(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchDataPaging--");
  const page = action.payload.page;
  const size = action.payload.size;
  localStorage.setItem("contact_page_size", size.toString());

  yield put(startProgress());
  // 백엔드에서 데이터 받아옴
  try{
  const result: AxiosResponse<ContactPagingResponse> = yield call(
    api.fetchPaging,
    page,
    size
  );
  yield put(endProgress());
  const contactPage: ContactPage= {
    data: result.data.content.map(
    (item) => ({
      id: item.id,
      name: item.name,
      phoneNum: item.phoneNum,
      email: item.email,
      description: item.description,
      createdTime: item.createdTime,
    } as ContactItem)
  ),
  totalElements: result.data.totalElements,
  totalPages: result.data.totalPages,
  page: result.data.number,
  pageSize: result.data.size,
  isLast: result.data.last,
};
  // state 초기화 reducer 실행
  yield put(initialContactPaged(contactPage))
}catch(e:any){
  yield put(endProgress());
  yield put (
    addAlert({id: nanoid(), variant: "danger", message: e.message})
  );
}
}

function* fetchDataNext(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchDataPaging--");
  const page = action.payload.page;
  const size = action.payload.size;

  yield put(startProgress());
  // 백엔드에서 데이터 받아옴
  try{
  const result: AxiosResponse<ContactPagingResponse> = yield call(
    api.fetchPaging,
    page,
    size
  );
  yield put(endProgress());
  const contactPage: ContactPage= {
    data: result.data.content.map(
    (item) => ({
      id: item.id,
      name: item.name,
      phoneNum: item.phoneNum,
      email: item.email,
      description: item.description,
      createdTime: item.createdTime,
    } as ContactItem)
  ),
  totalElements: result.data.totalElements,
  totalPages: result.data.totalPages,
  page: result.data.number,
  pageSize: result.data.size,
  isLast: result.data.last,
};
  // state 초기화 reducer 실행
  yield put(initialContactNext(contactPage))
}catch(e:any){
  yield put(endProgress());
  yield put (
    addAlert({id: nanoid(), variant: "danger", message: e.message})
  );
}
}

function* removeDataPaging(action: PayloadAction<number>) {
  yield console.log("--removeData--");
  const id = action.payload;
  yield put(startProgress());
  const result: AxiosResponse<boolean> = yield call(api.remove, id);
  yield put(endProgress());
  if (result.data) {
    yield put(removeContact(id));
  }else {
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 인해 저장되지 않았습니다."
      })
    );
  }
  yield put(initialCompleted());
  const page: number = yield select((state: RootState)=> state.contact.page);
  const size: number = yield select((state: RootState)=> state.contact.pageSize);

  yield put(requestFetchContactPaging({page,size}));
}

function* removeDataNext(action: PayloadAction<number>) {
  yield console.log("--removeDataNext--");
  const id = action.payload;
  yield put(startProgress());
  const result: AxiosResponse<boolean> = yield call(api.remove, id);
  yield put(endProgress());
  if (result.data) {
    yield put(removeContact(id));
  }else {
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 인해 저장되지 않았습니다."
      })
    );
  }
  yield put(initialCompleted());
}



function* modifyData(action: PayloadAction<ContactItem>) {
  console.log("--modifyData");
  const contactItemPayload = action.payload;

  const ContactItemRequest: ContactItemRequest = {
    name: contactItemPayload.name,
    phoneNum: contactItemPayload.phoneNum,
    email: contactItemPayload.email,
    description: contactItemPayload.description,
  };
  yield put(startProgress());

  const result: AxiosResponse<ContactItemResponse> = yield call(
    api.modify, 
    contactItemPayload.id, 
    ContactItemRequest
    );
  
  yield put(endProgress());

  const contactItem: ContactItem = {
    id: result.data.id,
    name: result.data.name,
    phoneNum: result.data.phoneNum,
    email: result.data.email,
    description: result.data.description,
    createdTime: result.data.createdTime,
  };
  yield put(modifyContact(contactItem));
  yield put(initialCompleted());
}


// saga action 감지 하는부분
export default function* contactSaga() {
  // 동일한 타입의 액션은 모두 처리
  yield takeEvery(requestAddContact, addDataNext);
  yield takeEvery(requestAddContactPaging, addDataPaging);
  yield takeEvery(requestAddContactNext, addDataNext);
  // 동일 타입의 액션 중에서 가장 마지막 액션만 처리, 이전액션 취소
  yield takeLatest(requestFetchContact, fetchData);
  yield takeLatest(requestFetchContactPaging, fetchDataPaging);
  yield takeLatest(requestFetchContactNext, fetchDataNext);
  // 삭제 처리
  yield takeEvery(requestRemoveContact, removeDataNext);
  yield takeEvery(requestRemoveContactPaging, removeDataPaging);
  yield takeEvery(requestRemoveContactNext, removeDataNext);

  // 수정 처리
  yield takeEvery(requestModifyContact, modifyData);
}

