
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
}


const initialState: ContactState = {
  data: [],
  isFetched: false
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

export const { addContact, removeContact, modifyContact, initialContact } = contactSlice.actions;
export default contactSlice.reducer;