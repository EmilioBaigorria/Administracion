import { create } from "zustand";
import { IUser } from "../types/IUser";

interface IUserStore {
    modalUser: IUser | null;
    setModalUser: (user: IUser) => void;
    deleteModalUser: () => void;
}

export const useModalUserStore = create<IUserStore>((set) => ({
    modalUser: null,
    setModalUser: (user) => set(() => ({ modalUser: user })),
    deleteModalUser: () => set(() => ({ modalUser: null })),
}));
