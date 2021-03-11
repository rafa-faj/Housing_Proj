import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateHousePostProperties, HousePost } from '../../models/PostModels';
import { AppThunk, RootState } from '../store';
import {
  addHousingBookmarkAPI,
  getHousingBookmarksAPI,
  newHousingPostAPI,
  removeHousingBookmarkAPI,
} from '../../apis/housing';
import { isRunningServer } from '../../utils/next';

export enum HousingMode {
  Browse,
  Filter,
}

interface HousingState {
  favorites?: { [id: string]: HousePost };
  searching: HousingMode;
}

const initialState: HousingState = {
  favorites: undefined,
  searching: HousingMode.Browse,
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
    setSearchingMode: (state, action: PayloadAction<HousingMode>) => {
      state.searching = action.payload;
    },
  },
});

// export the reducers that should be accessible by outside files
export const {} = housingSlice.actions;
// do NOT export these reducers. Only declare them and use them in the THUNKS
const {
  setHousingFavorites,
  addToHousingFavorites,
  removeFromHousingFavorites,
  setSearchingMode,
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

export const selectHousingSearchMode = (state: RootState) =>
  state.housing.searching;
export const selectHousingFavorites = (state: RootState) =>
  state.housing.favorites;

export default housingSlice.reducer;
