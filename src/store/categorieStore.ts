import { create } from "zustand";
import { ICategories } from "../types/ICategories";


interface ICategorieStore {
    activeCategorie: ICategories | null;
    setActiveCategorie: (categorie: ICategories) => void;
    deleteCategorie: () => void;
}

export const useCategorieStore = create<ICategorieStore>((set) => ({
    activeCategorie: null,
    setActiveCategorie: (categorie) => set(() => ({ activeCategorie: categorie })),
    deleteCategorie: () => set(() => ({ activeCategorie: null })),
}));
