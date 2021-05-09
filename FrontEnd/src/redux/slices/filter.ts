import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from '@redux';

interface FilterState {
  show: boolean;
}
const initialState: FilterState = {
  show: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const { setShow } = filterSlice.actions;
export const useShouldShowFilter = () =>
  useSelector((state) => state.filter.show);
export default filterSlice.reducer;
