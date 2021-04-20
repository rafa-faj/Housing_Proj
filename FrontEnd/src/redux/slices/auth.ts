import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { AppThunk, RootState } from '../store';
import { login as loginAPI, userEditProfile } from '@apis';
import { User, UserNameEmail } from '@models';

const cookies = new Cookies();

interface AuthState {
  userDraft?: User; // TODO change this to not be stored in redux and cookies
  shouldShowLogin: boolean;
  showNewUserPopup?: UserNameEmail;
}

const initialState: AuthState = {
  userDraft: cookies.get<User>('userDraft'),
  shouldShowLogin: false,
  showNewUserPopup: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDraft: (state, action: PayloadAction<User | undefined>) => {
      state.userDraft = action.payload;
      if (action.payload) {
        cookies.set('userDraft', action.payload, {
          // TODO should probably set this from the backend as well (similar to access_token)
          maxAge: 4320, // expires  72 hours after login
        });
      } else {
        cookies.remove('userDraft');
      }
    },
    startNewUserFlow: (state, action: PayloadAction<UserNameEmail>) => {
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

export const {
  setUserDraft,
  startNewUserFlow,
  endNewUserFlow,
  showLogin,
  hideLogin,
} = authSlice.actions;

export const editProfile = (
  email: string,
  userDraft: User,
  kvPairs: any,
  onSucess: Function,
): AppThunk => async (dispatch) => {
  const response = await userEditProfile(email, kvPairs);
  if (response) {
    onSucess(true);
    // TODO this shouldn't be used anymore... dispatch(setUser(userDraft));
  }
};

// Selects here
export const selectUserDraft = ({ auth }: RootState) => auth.userDraft;
export const selectShouldShowLogin = ({ auth }: RootState) => {
  return auth.shouldShowLogin;
};
export const selectShowNewUserPopup = ({ auth }: RootState) => {
  if (!auth.showNewUserPopup) {
    return { name: undefined, email: undefined } as Partial<UserNameEmail>;
  }

  return auth.showNewUserPopup;
};

// Export everything
export default authSlice.reducer;
