import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from '@redux';

interface PostState {
  shouldShowPost: boolean;
}

const initialState: PostState = {
  shouldShowPost: false,
};

/**
 * This slice is the redux slice for anything "post". This includes
 * anything with users posting a house
 */
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    showPost: (state) => {
      state.shouldShowPost = true;
    },
    hidePost: (state) => {
      state.shouldShowPost = false;
    },
  },
});

/**
 * Exporting action creators.
 */
export const { showPost, hidePost } = postSlice.actions;

/**
 * Exporting select hooks for this slice.
 */
export const useShouldShowPost = () => {
  return useSelector((state) => state.post.shouldShowPost);
};

export default postSlice.reducer;
