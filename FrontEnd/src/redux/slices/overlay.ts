import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from '@redux';

interface OverlayState {
  shouldOverlay: boolean;
}

const initialState: OverlayState = {
  shouldOverlay: false,
};

/**
 * This slice is the redux slice for anything "overlay". It handles
 * cases where we want to mimic an overlay of a component on the original content(without displaying it)
 */
export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    showOverlay: (state) => {
      state.shouldOverlay = true;
    },
    hideOverlay: (state) => {
      state.shouldOverlay = false;
    },
  },
});

/**
 * Exporting action creators.
 */
export const { showOverlay, hideOverlay } = overlaySlice.actions;

/**
 * Exporting select hooks for this slice.
 */
export const useShouldOverlay = () => {
  return useSelector((state) => state.overlay.shouldOverlay);
};

export default overlaySlice.reducer;
