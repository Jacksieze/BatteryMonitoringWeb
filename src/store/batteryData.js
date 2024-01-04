import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {},
  reducers: {
    setData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetData: (state, action) => {
      const packDataKey = action.payload;
      if (packDataKey in state) {
        delete state[packDataKey];
      }
    },
    clearData: () => {
      return {};
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

export const { setData, resetData, clearData } = dataSlice.actions;
export const { setIsConnected } = connectionSlice.actions;

const reducer = combineReducers({
  data: dataSlice.reducer,
  connection: connectionSlice.reducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
