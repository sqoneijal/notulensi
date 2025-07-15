import { createSlice } from "@reduxjs/toolkit";

export const redux = createSlice({
   name: "redux",
   initialState: {
      init: {},
      module: {},
      position: [],
      filter: {},
      actionButton: {},
   },
   reducers: {
      setInit: (state, action) => {
         state.init = action.payload;
      },
      position: (state, action) => {
         state.position = action.payload;
      },
      setModule: (state, action) => {
         state.module = action.payload;
      },
      setFilter: (state, action) => {
         state.filter = action.payload;
      },
      setActionButton: (state, action) => {
         state.actionButton = action.payload;
      },
   },
});
export const { init, setInit, setModule, position, setFilter, actionButton, setActionButton } = redux.actions;
export default redux.reducer;
