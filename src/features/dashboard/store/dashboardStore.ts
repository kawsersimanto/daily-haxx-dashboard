/* eslint-disable @typescript-eslint/no-empty-object-type */
import { create } from "zustand";

export interface DashboardState {}

export const useDashboardStore = create<DashboardState>(() => ({
  // initial state
}));
