import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { auth, housing, filter } from './slices/index';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { isRunningDev } from '../utils/next';

const storeSlices = {
  auth,
  housing,
  filter,
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
