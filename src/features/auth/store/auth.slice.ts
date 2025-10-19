import { AuthState } from "@/features/auth/auth.interface";
import { IUser } from "@/features/user/user.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState: AuthState = {
  email: "",
  currentStep: 0,
  totalSteps: 2,
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },

    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    nextStep: (state) => {
      if (state.currentStep < state.totalSteps - 1) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    goToStep: (state, action: PayloadAction<number>) => {
      const step = action.payload;
      if (step >= 0 && step < state.totalSteps) {
        state.currentStep = step;
      }
    },
    reset: () => initialState,
  },
});

export const {
  setEmail,
  setToken,
  setUser,
  updateUser,
  nextStep,
  prevStep,
  goToStep,
  reset,
} = authSlice.actions;

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

export const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
