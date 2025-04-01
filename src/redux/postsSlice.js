import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, createPost, updatePost, deletePost } from '../api/postsApi';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getPosts();
  return response;
});

// Add a post
export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
  const response = await createPost(newPost);
  return response;
});

// Edit a post
export const editPost = createAsyncThunk('posts/editPost', async ({ id, updatedPost }) => {
  const response = await updatePost(id, updatedPost);
  return response;
});

// Remove a post
export const removePost = createAsyncThunk('posts/removePost', async (id) => {
  const response = await deletePost(id);
  return response.id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add post
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // Edit post
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      // Remove post
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;

