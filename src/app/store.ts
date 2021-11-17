import {
  configureStore,
  combineReducers,
  AnyAction,
  createAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import resourceFilter from "features/resourceFilters/resourceFilterSlice";
import { api } from "services/api/api";

const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  resourceFilter,
});
export type RootState = ReturnType<typeof appReducer>;

export const resetState = createAction("state/reset");

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === resetState().type) state = undefined;
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
