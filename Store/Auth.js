import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userid: null,
  userinitaldata: null, // userinitaldata is the data that is fetched from the api when the user logs in
  token: null,
  userprofiledata: null,
  verify: {
    id: null,
    otp: null,
  },
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: initialState,
  reducers: {
    LoginRed(state, action) {
      state.token = action.payload.token;
      state.userid = action.payload.userid;
      state.userinitaldata = action.payload.userinitaldata;
    },
    UserProfileDataRed(state, action) {
      state.userprofiledata = action.payload.userprofiledata;
    },
    VerifyRed(state, action) {
      state.verify.id = action.payload.id;
      state.verify.otp = action.payload.otp;
    },
    LogoutRed(state) {
      // state.user = null;
      state.token = null;
      // state.userid = null;
      // state.userinitaldata = null;
    },
  },
});

export const {LoginRed, LogoutRed, UserProfileDataRed, VerifyRed} =
  AuthSlice.actions;
export default AuthSlice.reducer;
