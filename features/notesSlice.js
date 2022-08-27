import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API, API_CREATE, API_POSTS, API_STATUS } from "../constants";
import { collection, deleteDoc, doc, setDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
    posts: [],
    status: API_STATUS.idle,
    error: null,
};

export const fetchPosts = createAsyncThunk("notes/fetchPosts", async () => {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const notes = querySnapshot.docs.map((doc) => {
        // console.log(doc.data());
        return { id: doc.id, ...doc.data() };
    });
    // console.log(notes);
    return notes;
});

export const addNewPost = createAsyncThunk("notes/addNewPost", async (newPost) => {
    await setDoc(doc(db, "notes", newPost.id), newPost);
    return newPost;
});

export const updatePostThunk = createAsyncThunk("posts/updatePost", async (updatedPost) => {
    await updateDoc(doc(db, "notes", updatedPost.id), updatedPost);
    return updatedPost;
})

export const deletePostThunk = createAsyncThunk("posts/deletePost", async (id) => {
    await deleteDoc(doc(db, "notes", id));
    return id;
})

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
        })
        .addCase(updatePostThunk.fulfilled, (state, action) => {
            const {id } = action.payload;
            const posts = state.posts;
            const post = state.posts.find((post) => post.id === id);
            const postIndex = posts.indexOf(post);
            if (~postIndex) posts[postIndex] = action.payload;
        })
        .addCase(deletePostThunk.fulfilled, (state, action) => {
            const id = action.payload;
            const updatedPosts = state.posts.filter((item) => item.id !== id);
            state.posts = updatedPosts;
        });
  },
});

export const { noteAdded } = notesSlice.actions;

export default notesSlice.reducer;