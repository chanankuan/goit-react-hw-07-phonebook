import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getRandomHexColor } from 'utils/helper';
import { initialState } from './initialState';

axios.defaults.baseURL = 'https://657cc827853beeefdb99f6df.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (userData, { rejectWithValue }) => {
    try {
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
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState.contacts,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.fetchInProgress = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.fetchInProgress = false;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, state => {
        state.postInProgress = true;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.postInProgress = false;
        state.items = state.items.concat(payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, state => {
        state.deleteInProgress = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.deleteInProgress = false;
        state.items = state.items.filter(({ id }) => id !== payload.id);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
