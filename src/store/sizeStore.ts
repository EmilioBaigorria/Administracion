import { create } from "zustand";
import { ISize } from "../types/ISize";


interface ISizeStore {
    activeSize: ISize | null;
    setActiveSize: (size: ISize) => void;
    deleteSize: () => void;
}

export const useSizeStore = create<ISizeStore>((set) => ({
    activeSize: null,
    setActiveSize: (size) => set(() => ({ activeSize: size })),
    deleteSize: () => set(() => ({ activeSize: null })),
}));
