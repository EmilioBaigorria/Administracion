import { create } from "zustand";
import { IProduct } from "../types/IProduct";

interface IProductStore {
    actireProduct: IProduct | null;
    setActiveProduct: (product: IProduct) => void;
    deleteProduct: () => void;
}

export const useProductStore = create<IProductStore>((set) => ({
    actireProduct: null,
    setActiveProduct: (product) => set(() => ({ actireProduct: product })),
    deleteProduct: () => set(() => ({ actireProduct: null })),
}));
