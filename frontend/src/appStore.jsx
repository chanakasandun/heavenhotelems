import { create } from "zustand"; // Use named import for create
import { persist } from "zustand/middleware";

const appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set((state) => ({ dopen })),
});

const useAppStore = create(
  persist(appStore, {
    name: "my_app_store",
  })
);

export default useAppStore;
