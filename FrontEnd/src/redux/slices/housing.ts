import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateHousePostProperties, HousePost, FilterModel } from '@models';
import { AppThunk, RootState } from '@redux';
import {
  addHousingBookmarkAPI,
  getHousingBookmarksAPI,
  newHousingPostAPI,
  removeHousingBookmarkAPI,
} from '@apis';
import { isRunningServer } from '@utils';

export enum HousingMode {
  Browse,
  Filter,
}

type HousingState = {
  favorites?: { [id: string]: HousePost };
  mode: HousingMode;
  filterData?: FilterModel;
};

const initialState: HousingState = {
  favorites: undefined,
  mode: HousingMode.Browse,
};

export const housingSlice = createSlice({
  name: 'housing',
  initialState,
  reducers: {
    setHousingFavorites: (
      state,
      action: PayloadAction<HousePost[] | undefined>,
    ) => {
      state.favorites = {};
      const newFavorites = action.payload;

      if (newFavorites) {
        newFavorites.forEach((housePost) => {
          if (state.favorites) state.favorites[housePost.roomId] = housePost;
        });
      }
    },
    addToHousingFavorites: (state, action: PayloadAction<HousePost>) => {
      if (!state.favorites) state.favorites = {};

      state.favorites[action.payload.roomId] = action.payload;
    },
    // Pass in the HousePost ID (temporarily use the function defined above)
    removeFromHousingFavorites: (state, action: PayloadAction<number>) => {
      if (state.favorites) {
        delete state.favorites[action.payload];
      }
    },
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

// do NOT export these reducers. Only declare them and use them in the THUNKS
const {
  setHousingFavorites,
  addToHousingFavorites,
  removeFromHousingFavorites,
} = housingSlice.actions;

export const newHousingPost = (
  housePost: CreateHousePostProperties,
): AppThunk => async (dispatch, getState) => {
  const email = getState().auth.user?.email;
  if (!email) return;

  const result = await newHousingPostAPI({ ...housePost, email });
  if (result && !isRunningServer()) {
    window.location.reload(false);
  } else {
    // handle the error
  }
};

export const resetHousingFavorites = (): AppThunk => async (dispatch) => {
  dispatch(setHousingFavorites(undefined));
};

export const getHousingFavorites = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const { user } = getState().auth;
  if (!user) return;

  const favorites = await getHousingBookmarksAPI();
  if (favorites) {
    dispatch(setHousingFavorites(favorites));
  }
  // handle errors here
};

export const newHousingFavorite = (housePost: HousePost): AppThunk => async (
  dispatch,
  getState,
) => {
  const { user } = getState().auth;
  if (!user) {
    dispatch(addToHousingFavorites(housePost));
    return;
  }

  // TODO eventually change the housePost in here to just be the housePostId
  const result = await addHousingBookmarkAPI(housePost.roomId);
  if (result) {
    dispatch(addToHousingFavorites(housePost));
  } else {
    // handle error here
  }
};

export const removeHousingFavorite = (roomId: number): AppThunk => async (
  dispatch,
  getState,
) => {
  const { user } = getState().auth;
  if (!user) {
    dispatch(removeFromHousingFavorites(roomId));
    return;
  }

  const result = await removeHousingBookmarkAPI(roomId);
  if (result) {
    dispatch(removeFromHousingFavorites(roomId));
  } else {
    // handle error here
  }
};

export const postAllHousingFavorites = (): AppThunk => async (
  dispatch,
  getState,
) => {
  const { favorites } = getState().housing;
  if (favorites) {
    Object.values(favorites).forEach((favorite) => {
      addHousingBookmarkAPI(favorite.roomId);
    });
  }
};

export const selectHousingMode = ({ housing }: RootState) => {
  return housing.mode;
};
export const selectFilterData = ({ housing }: RootState) => {
  return housing.filterData;
};
export const selectHousingFavorites = ({ housing }: RootState) => {
  return housing.favorites;
};

export default housingSlice.reducer;
