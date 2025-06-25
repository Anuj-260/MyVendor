import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import vendorsReducer from "./slices/vendorsSlice";
import cartReducer from "./slices/cartSlice";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    vendors: vendorsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
