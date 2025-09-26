import { create } from "zustand";

const defaultState = { id: "", title: "" };

interface RenameModalState {
  isOpen: boolean;
  initialValues: typeof defaultState;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<RenameModalState>((set) => ({
  isOpen: false,
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialValues: { id, title },
    }),
  onClose: () => set({ isOpen: false, initialValues: defaultState }),
  initialValues: defaultState,
}));
