import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiState = {
  eventsLongPressed?: boolean;
};

const initialState: UiState = {};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    eventLongPressChange(state, action: PayloadAction<boolean>) {
      state.eventsLongPressed = action.payload;
    },
  },
});

export const { eventLongPressChange } = uiSlice.actions;
