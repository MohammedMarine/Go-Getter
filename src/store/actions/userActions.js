import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

export const changeField = createAction('user/changeField');

export const logout = createAction('user/logout');

export const login = createAsyncThunk('user/login', async (_, thunkAPI) => {
  const { email, password } = thunkAPI.getState().user.credentials;
  const { data } = await axiosInstance.post('/login', { email, password });
  localStorage.setItem('user', JSON.stringify(data));
  localStorage.setItem('token', data.token);

  return data;
});
