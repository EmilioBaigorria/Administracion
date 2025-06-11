import { create } from "zustand";
import { IDiscount } from "../types/IDiscount";



interface IDiscountStore {
    activeDiscount: IDiscount | null;
    setActiveDiscount: (discount: IDiscount) => void;
    deleteDiscount: () => void;
}

export const useDiscountStore = create<IDiscountStore>((set) => ({
    activeDiscount: null,
    setActiveDiscount: (discount) => set(() => ({ activeDiscount: discount })),
    deleteDiscount: () => set(() => ({ activeDiscount: null })),
}));
