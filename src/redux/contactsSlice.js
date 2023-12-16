import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getRandomHexColor } from 'utils/helper';
import { initialState } from './initialState';

axios.defaults.baseURL = 'https://657cc827853beeefdb99f6df.mockapi.io';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async () => {
    const response = await axios.get('/contacts');
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async userData => {
    const response = await axios({
      method: 'post',
      url: '/contacts',
      data: {
        name: userData.name,
        phone: userData.number,
        bgColor: getRandomHexColor().bgColor,
        color: getRandomHexColor().color,
      },
    });
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async userId => {
    const response = await axios.delete(`/contacts/${userId}`);
    return response.data;
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState.contacts,

  extraReducers: builder => {
    builder
      .addCase(getContacts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(getContacts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addContact.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.concat(payload);
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.filter(({ id }) => id !== payload);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
