import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterModel } from '@models';
import { RootState } from '@redux';

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

// export the reducers that should be accessible by outside files
export const { setHousingMode } = housingSlice.actions;

// TODO delete
// export const newHousingPost = (
//   housePost: CreateHousePostProperties,
// ): AppThunk => async (dispatch, getState) => {
//   const email = getState().auth.user?.email;
//   if (!email) return;

//   const result = await newHousingPostAPI({ ...housePost, email });
//   if (result && !isRunningServer()) {
//     window.location.reload(false);
//   } else {
//     // handle the error
//   }
// };

export const selectHousingMode = ({ housing }: RootState) => {
  return housing.mode;
};
export const selectFilterData = ({ housing }: RootState) => {
  return housing.filterData;
};

export default housingSlice.reducer;
