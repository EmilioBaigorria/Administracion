import { FC } from "react"
import { ICategories } from "../../../types/ICategories"
import { Button } from "../Button/Button"
import styles from "./CategorieBarCard.module.css"
import { deleteCategorieById } from "../../../http/categorieRequest"
import Swal from "sweetalert2"
import { useCategorieStore } from "../../../store/categorieStore"
interface ICategorieBarCard {
    categorie: ICategories
    setCategorieModal:Function
}
export const CategorieBarCard: FC<ICategorieBarCard> = ({ categorie,setCategorieModal }) => {

    const setActiveCategorie=useCategorieStore((state)=>state.setActiveCategorie)
    const handleDeleteCategorie=async()=>{
        Swal.fire({
            title: "¿Seguro?",
            text: "Esta accion es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            cancelButtonText:"Cancelar",
            confirmButtonText: "Eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteCategorieById(categorie.id!.toString())
                Swal.fire({
                title: "Categoria Eliminada",
                icon: "success"
                });
            }
        });
    }
    const handleOpenEditModal=()=>{
        setActiveCategorie(categorie)
        setCategorieModal(true)
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p>Nombre:{categorie.nombre}</p>
            </div>
            <div className={styles.buttonsContainer}>
                <Button icon={
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                } styleSet={false} action={handleOpenEditModal} />
                <Button icon={
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                } styleSet={false} action={handleDeleteCategorie} />
            </div>
        </div>
    )
}
