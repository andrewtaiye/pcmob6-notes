import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { noteAdded } = notesSlice.actions;

export default notesSlice.reducer;