import { FC } from "react"
import Swal from "sweetalert2"
import { deleteCategorieById } from "../../../http/categorieRequest"
import { useCategorieStore } from "../../../store/categorieStore"
import { ICategories } from "../../../types/ICategories"
import { Button } from "../Button/Button"
import styles from "./CategorieBarCard.module.css"
interface ICategorieBarCard {
    categorie: ICategories
    setCategorieModal: Function
    refresh: boolean
    setRefresh: Function
}
export const CategorieBarCard: FC<ICategorieBarCard> = ({ categorie, setCategorieModal, refresh, setRefresh }) => {

    const setActiveCategorie = useCategorieStore((state) => state.setActiveCategorie)
    const handleDeleteCategorie = async () => {
        Swal.fire({
            title: "¿Seguro?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteCategorieById(categorie.id!.toString())
                Swal.fire({
                    title: "Categoría eliminada",
                    icon: "success"
                });
                setRefresh(!refresh)
            }
        });
    }
    const handleOpenEditModal = () => {
        setActiveCategorie(categorie)
        setCategorieModal(true)
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p><b>Nombre:</b> {categorie.nombre}</p>
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
