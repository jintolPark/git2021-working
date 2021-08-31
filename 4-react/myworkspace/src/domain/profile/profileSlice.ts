import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bori } from "../../common/data";


export interface ProfileState { 
  image: string | undefined;
  username: string | undefined;
}


const initialState: ProfileState ={ 
 image: bori,
 username: "Jinseok Park"
}

// slice를 생성
export const profileSlice = createSlice({
  name: "profile", 
  initialState, 
  reducers: {
    saveProfile: (state, action: PayloadAction<ProfileState>) => {


const profile = action.payload;
state.image = profile.image;
state.username = profile.username;
  },
},    
});

export const { saveProfile } = profileSlice.actions;


export default profileSlice.reducer;