import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {},
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
  },
});

const connectionSlice = createSlice({
  name: "connection",
  initialState: false,
  reducers: {
    setIsConnected: (state, action) => {
      return action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export const { setIsConnected } = connectionSlice.actions;

const reducer = combineReducers({
  data: dataSlice.reducer,
  connection: connectionSlice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;
