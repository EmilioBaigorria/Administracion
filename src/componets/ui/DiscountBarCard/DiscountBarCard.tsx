import styles from "./DiscountBarCard.module.css"
import { Button } from '../Button/Button'
import { IDiscount } from "../../../types/IDiscount"
import { FC } from "react"
import Swal from "sweetalert2"
import { deleteDiscountById } from "../../../http/discountRequest"
import { useCategorieStore } from "../../../store/categorieStore"


interface IDiscountBarCard {
    discount: IDiscount
}

export const DiscountBarCard:FC<IDiscountBarCard> = ({discount}) => {

    const handleDeleteDiscount=async()=>{
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
                    await deleteDiscountById(discount.id!.toString())
                    Swal.fire({
                    title: "Descuento Eliminada",
                    icon: "success"
                    });
                }
            });
        }
    const handleOpenEditModal=()=>{

    }
  return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p>Porcentaje:{discount.descuento}</p>
                <p>Inicia:{new Date(discount.fechaInicio.toString()).toLocaleDateString()}</p>
                <p>Termina:{new Date(discount.fechaInicio.toString()).toLocaleDateString()}</p>
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
                } styleSet={false} action={handleDeleteDiscount} />
            </div>
        </div>
    )
}
