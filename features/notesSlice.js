import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API, API_CREATE, API_POSTS, API_STATUS } from "../constants";

const initialState = {
    posts: [],
    status: API_STATUS.idle,
    error: null,
};

export const fetchPosts = createAsyncThunk("notes/fetchPosts", async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(API + API_POSTS, {
        headers: { Authorization: `JWT ${token}` },
    });
    return response.data;
});

export const addNewPost = createAsyncThunk("notes/addNewPost", async (newPost) => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(API + API_POSTS, newPost, {
        headers: { Authorization: `JWT ${token}` },
    });
    return response.data;
});

const notesSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers(builder){
    builder
        .addCase(fetchPosts.pending, (state) => {
            state.status = API_STATUS.pending;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = API_STATUS.fulfilled;
            state.posts = state.posts.concat(action.payload);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = API_STATUS.rejected;
            state.error = action.error.message;
            console.log("Failed to fetch posts. Error: ", action.error.message);
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        });
  },
});

export const { noteAdded } = notesSlice.actions;

export default notesSlice.reducer;