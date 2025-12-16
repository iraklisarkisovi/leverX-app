import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/types";

interface IStateType {
  userData: IUser;
  updatedUserData: IUser;
  IsEdit: boolean;
}

const initialState: IStateType = {
  userData: {
      role: "",
      subrole: "",
      _id: "",
      isRemoteWork: false,
      user_avatar: "",
      first_name: "",
      last_name: "",
      first_native_name: "",
      last_native_name: "",
      middle_native_name: "",
      department: "",
      building: "",
      room: "",
      date_birth: {
          year: 0,
          month: 0,
          day: 0
      },
      desk_number: 0,
      manager: {
          id: "",
          first_name: "",
          last_name: ""
      },
      phone: "",
      email: "",
      skype: "",
      cnumber: "",
      citizenship: "",
      visa: []
  },
  updatedUserData: {
      role: "",
      subrole: "",
      _id: "",
      isRemoteWork: false,
      user_avatar: "",
      first_name: "",
      last_name: "",
      first_native_name: "",
      last_native_name: "",
      middle_native_name: "",
      department: "",
      building: "",
      room: "",
      date_birth: {
          year: 0,
          month: 0,
          day: 0
      },
      desk_number: 0,
      manager: {
          id: "",
          first_name: "",
          last_name: ""
      },
      phone: "",
      email: "",
      skype: "",
      cnumber: "",
      citizenship: "",
      visa: []
  },
  IsEdit: false
};

const UserSlice = createSlice({
    initialState,
    name: "HomeSlice",
    reducers: {
        GetUserState: (state, action) => {
            state.userData = action.payload
        },

        GetUpdatedUserState: (state, action) => {
            state.updatedUserData = action.payload
        },

        HandleEdit: state => {
            state.IsEdit = !state.IsEdit
        }
    }
})

export const UserPageSlice = UserSlice.reducer;
export const { GetUserState, GetUpdatedUserState, HandleEdit } = UserSlice.actions;