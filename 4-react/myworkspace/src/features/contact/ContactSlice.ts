
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  name: string;
  phoneNum: string;
  email: string;
  description: string;
  createdTime: number;
  modifyTime?: number;
}

interface ContactState {
  data: ContactItem[];
  isFetched: boolean;
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부
}


const initialState: ContactState = {
  data: [],
  isFetched: false,
}



const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      console.log("--in reducer function--")
      console.log(contact);
      state.data.unshift(contact)
    },
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id === id), 1
      );
    },
    modifyContact: (state, action: PayloadAction<ContactItem>) => {
      const modifyItem = action.payload;

      const contactItem = state.data.find((item) => item.id === modifyItem.id);
      if (contactItem) {
        contactItem.name = modifyItem.name;
        contactItem.phoneNum = modifyItem.phoneNum;
        contactItem.email = modifyItem.email;
        contactItem.description = modifyItem.description;
      }
    },
    initialContact: (state, action: PayloadAction<ContactItem[]>) => {
      const contact = action.payload;
      state.data = contact;
      state.isFetched = true;
    },
  },
});

export const { addContact, removeContact, modifyContact, initialContact, initialCompleted } = contactSlice.actions;
export default contactSlice.reducer;