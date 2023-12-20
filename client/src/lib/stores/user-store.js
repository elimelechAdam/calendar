import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const usePaginationStore = create((set) => ({
  currentPage: 1,
  setPage: (page) => set({ currentPage: page }),
  clearPage: () => set({ currentPage: 1 }),
}));
