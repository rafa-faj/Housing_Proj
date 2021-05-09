import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateHousePostProperties, FilterModel } from '@models';
import { AppThunk, useSelector } from '@redux';
import { createHousingPost } from '@apis';
import { isRunningServer } from '@utils';

export enum HousingMode {
  Browse,
  Filter,
}

type HousingState = {
  mode: HousingMode;
  filterData?: FilterModel;
};

const initialState: HousingState = {
  mode: HousingMode.Browse,
};

export const housingSlice = createSlice({
  name: 'housing',
  initialState,
  reducers: {
    setHousingMode: (
      state,
      action: PayloadAction<
        | HousingMode.Browse
        | { mode: HousingMode.Filter; filterData: FilterModel }
      >,
    ) => {
      if (action.payload === HousingMode.Browse) {
        state.mode = action.payload;
      } else {
        state.filterData = action.payload.filterData;
        state.mode = action.payload.mode;
      }
    },
  },
});

export const { setHousingMode } = housingSlice.actions;

export const newHousingPost = (
  housePost: CreateHousePostProperties,
): AppThunk => async (dispatch, getState) => {
  const email = getState().auth.user?.email;
  if (!email) return;

  const result = await createHousingPost({ ...housePost, email });
  if (result && !isRunningServer()) {
    window.location.reload(false);
  } else {
    // handle the error
  }
};

export const useHousingMode = () => useSelector((state) => state.housing.mode);
export const useFilterData = () =>
  useSelector((state) => state.housing.filterData);

export default housingSlice.reducer;
