import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from '@redux';
import { postingType } from '@components';

interface PostState {
  shouldShowPost: boolean;
  showPostType: postingType;
}

const initialState: PostState = {
  shouldShowPost: false,
  showPostType: 'landlord',
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
    setShowPostType: (state, action: PayloadAction<postingType>) => {
      state.showPostType = action.payload;
    },
  },
});

/**
 * Exporting action creators.
 */
export const { showPost, hidePost, setShowPostType } = postSlice.actions;

/**
 * Exporting select hooks for this slice.
 */
export const useShouldShowPost = () => {
  return useSelector((state) => state.post.shouldShowPost);
};

export const useShowPostType = () => {
  return useSelector((state) => state.post.showPostType);
};

export default postSlice.reducer;
