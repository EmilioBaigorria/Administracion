import { create } from "zustand";
import { IUser } from "../types/IUser";

interface IUserStore {
    actireUser: IUser | null;
    setActiveUser: (user: IUser) => void;
    deleteUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    actireUser: null,
    setActiveUser: (user) => set(() => ({ actireUser: user })),
    deleteUser: () => set(() => ({ actireUser: null })),
}));
