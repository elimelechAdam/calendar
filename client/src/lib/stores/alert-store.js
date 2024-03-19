import { create } from "zustand";

export const useAlertStore = create((set, get) => ({
  alert: false,
  content: "",
  color: "",
  timeoutId: undefined, // Include timeoutId in the store's initial state

  setAlert: ({ content, color }, duration = 3000) => {
    // Clear the timeout if there's already one running
    if (get().timeoutId) {
      clearTimeout(get().timeoutId);
    }

    // Set the new alert state
    set({ alert: true, content, color });

    // Set a new timeout to clear the alert
    const newTimeoutId = setTimeout(() => {
      get().clearAlert();
    }, duration);

    // Update the state with the new timeout ID
    set((state) => ({ ...state, timeoutId: newTimeoutId }));
  },

  clearAlert: () => {
    // Clear any running timeout
    const timeoutId = get().timeoutId;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Reset the alert state and remove the timeoutId
    set({ alert: false, content: "", color: "", timeoutId: undefined });
  },
}));
