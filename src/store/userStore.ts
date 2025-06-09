import { create } from "zustand";
import { IUser } from "../types/IUser";

interface IUserStore {
    actireUser: IUser | null;
    setActiveUser: (user: IUser) => void;
    deleteUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    actireUser: null,
    setActiveUser: (product) => set(() => ({ actireUser: product })),
    deleteUser: () => set(() => ({ actireUser: null })),
}));
