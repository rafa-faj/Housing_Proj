import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authReducer, housingReducer, filterReducer } from './slices/index';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { isRunningDev } from '../utils/next';

const storeSlices = {
  auth: authReducer,
  housing: housingReducer,
  filter: filterReducer,
};

const exampleStore = configureStore({
  reducer: storeSlices,
});

export type RootState = ReturnType<typeof exampleStore.getState>;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const createStore: MakeStore<RootState> = (context: Context) => {
  return configureStore({
    reducer: storeSlices,
  });
};

export const reduxNextWrapper = createWrapper<RootState>(createStore, {
  debug: isRunningDev(),
});
