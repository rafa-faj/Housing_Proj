import {
  configureStore as configureReduxStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import { authReducer, filterReducer } from './slices/index';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { isRunningDev } from '@utils';
import {
  TypedUseSelectorHook,
  useSelector as untypedUseSelector,
  useDispatch as untypedUseDispatch,
} from 'react-redux';

const storeSlices = {
  auth: authReducer,
  filter: filterReducer,
};

/**
 * Custom configureStore function with reducer included
 */
export const configureStore = () =>
  configureReduxStore({
    reducer: storeSlices,
  });

// Create an example store to use for typing later (i.e. typeof exampleStore)
const exampleStore = configureStore();

export type RootState = ReturnType<typeof exampleStore.getState>;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/**
 * A typed custom useSelector hook so that you don't have to type the state each time.
 */
export const useSelector: TypedUseSelectorHook<RootState> = untypedUseSelector;

/**
 * The return of dispatch() for thunks is incorrect. Use this for correct type support.
 */
export const useThunkDispatch = () => {
  return untypedUseDispatch<typeof exampleStore.dispatch>();
};

/**
 * Function to create the store. Necessary for the redux next wrapper, which is required
 * for server side rendering (basically, we need to send a copy of the store to the client
 * to keep them in sync).
 */
const createStore: MakeStore<RootState> = (context: Context) => {
  return configureStore();
};

/**
 * Wrapped version of createStore (above), used in _app.tsx to create the copy of redux store
 * on each necessary render.
 */
export const reduxNextWrapper = createWrapper<RootState>(createStore, {
  debug: isRunningDev(),
});
