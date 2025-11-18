import { articleReducer } from "@/features/article/store/article.slice";
import { authReducer } from "@/features/auth/store/auth.slice";
import { userReducer } from "@/features/user/store/user.slice";
import { baseApi } from "@/redux/api/baseApi";
import { articleCategoryReducer } from "@/features/article-category/store/article-category.slice";
import { paymentReducer } from "@/features/payment/store/payment.slice";
import { subscriptionReducer } from "@/features/subscription/store/subscription.slice";
import { pollReducer } from "@/features/poll/store/poll.slice";
import { imageReducer } from "@/features/image/store/image.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  whitelist: [],
  storage,
};

const rootReducer = combineReducers({
  articleCategory: articleCategoryReducer,
  payment: paymentReducer,
  subscription: subscriptionReducer,
  poll: pollReducer,
  image: imageReducer,
  article: articleReducer,
  user: userReducer,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
