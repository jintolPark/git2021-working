
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  contact1: string;
  contact2: string;
  contact3: string;
  description: string;
  createdTime: number;
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
      contact2: "010-4462-0529",
      contact3: "pjsjja458@naver.com",
      description: "내정보",
      createdTime: new Date().getDate(),
    },
    {
      id: 1,
      contact1: "박진석",
      contact2: "010-4462-0529",
      contact3: "pjsjja458@naver.com",
      description: "내정보",
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
    }
  },

});

export const { addContact, removeContact } = contactSlice.actions;
export default contactSlice.reducer;