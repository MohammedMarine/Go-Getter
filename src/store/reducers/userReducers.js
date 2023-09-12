import { createReducer } from '@reduxjs/toolkit';
import { login, logout, changeField } from '../actions/userActions';
import axiosInstance from '../../utils/axios';

const localUser = JSON.parse(localStorage.getItem('user'));

export const initialState = {
  logged: false,
  credentials: {
    email: '',
    password: '',
  },
  pseudo: undefined,
  token: undefined,
  role: undefined,
  error: false,
  setError: false,
  ...localUser,
};
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeField, (state, action) => {
      const { name, value } = action.payload;

      state.credentials[name] = value;
    })
    .addCase(login.fulfilled, (state, action) => {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.token}`;
      state.logged = true;
      state.role = action.payload.role;
      state.pseudo = action.payload.pseudo;
      state.token = action.payload.token;
      state.credentials = {
        email: '',
        password: '',
      };
    })
    .addCase(login.rejected, (state, action) => {
      console.log(action.error);
      state.error = true;
    })
    .addCase(logout, (state) => {
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.pseudo = undefined;
      state.logged = false;
      state.token = undefined;
    });
});

export default userReducer;
