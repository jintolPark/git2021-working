
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  contact1: string;
  contact2: string;
  contact3: string;
  description: string;
  createdTime: number;
  modifyTime?: number;
}

interface ContactState {
  data: ContactItem[];
  isFetched: boolean;
}


const initialState: ContactState = {
  data: [
    {
      id: 2,
      contact1: "박진석",
      contact2: "010-1234-5678",
      contact3: "pjsjja0011@naver.com",
      description: "박진석의 연락처 정보",
      createdTime: new Date().getTime(),
    },
    {
      id: 1,
      contact1: "박보리",
      contact2: "010-5678-9012",
      contact3: "pjsjja2233@naver.com",
      description: "박보리는 귀여워",
      createdTime: new Date().getTime(),
    },
  ],
  isFetched: false
}



const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      console.log(contact);
      state.data.unshift(contact)
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
        contactItem.contact1 = modifyItem.contact1;
        contactItem.contact2 = modifyItem.contact2;
        contactItem.contact3 = modifyItem.contact3;
        contactItem.description = modifyItem.description;
      }
    }
  },

});

export const { addContact, removeContact, modifyContact } = contactSlice.actions;
export default contactSlice.reducer;