import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from '@redux';
import { User, UserNameEmail } from '@models';

interface AuthState {
  user?: User;
  shouldShowLogin: boolean;
  showNewUserPopup?: UserNameEmail;
}

const initialState: AuthState = {
  user: undefined,
  shouldShowLogin: false,
  showNewUserPopup: undefined,
};

/**
 * This slice is the redux slice for anything "auth". This includes
 * anything with users (login, creating new users) and anything with
 * the user's profile.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
      // This should be using backend cookies
    },
    startNewUserFlow: (
      state,
      action: PayloadAction<UserNameEmail | undefined>,
    ) => {
      state.showNewUserPopup = action.payload;
    },
    endNewUserFlow: (state) => {
      state.showNewUserPopup = undefined;
    },
    showLogin: (state) => {
      state.shouldShowLogin = true;
    },
    hideLogin: (state) => {
      state.shouldShowLogin = false;
    },
  },
});

/**
 * Exporting action creators.
 */
export const {
  setUser,
  startNewUserFlow,
  endNewUserFlow,
  showLogin,
  hideLogin,
} = authSlice.actions;

/**
 * Exporting select hooks for this slice.
 */
export const useUser = () => useSelector((state) => state.auth.user);
export const useShouldShowLogin = () => {
  return useSelector((state) => state.auth.shouldShowLogin);
};
export const useShowNewUserPopup = () => {
  return useSelector((state) => state.auth.showNewUserPopup);
};

export default authSlice.reducer;
