import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
