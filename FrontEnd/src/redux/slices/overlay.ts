import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from '@redux';

interface OverlayState {
  shouldOverlayCurrentPage: boolean;
}

const initialState: OverlayState = {
  shouldOverlayCurrentPage: false,
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
      state.shouldOverlayCurrentPage = true;
    },
    hideOverlay: (state) => {
      state.shouldOverlayCurrentPage = false;
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
export const useshouldOverlayCurrentPage = () => {
  return useSelector((state) => state.overlay.shouldOverlayCurrentPage);
};

export default overlaySlice.reducer;
