import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';

export const register = createAsyncThunk('user/register', async (payload) => {
  //Call api to register
  const data = await userApi.register(payload);

  //save data to localStorage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  //return user data for sending to reducer update state on redux
  return data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  //Call api to login
  const data = await userApi.login(payload);

  //save data to localStorage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  //return user data for sending to reducer update state on redux
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      //clear localStorage
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);

      //reset state
      state.current = {};
    },
  },
  extraReducers: {
    //handle in case action fullfilled (success)
    [register.fulfilled]: (state, action) => {
      //will update here
      state.current = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      //will update here
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer; //default export => import by any name u want
