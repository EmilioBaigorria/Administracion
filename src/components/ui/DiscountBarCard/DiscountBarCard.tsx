import { FC } from "react"
import Swal from "sweetalert2"
import { deleteDiscountById } from "../../../http/discountRequest"
import { useDiscountStore } from "../../../store/discountStore"
import { IDiscount } from "../../../types/IDiscount"
import { Button } from '../Button/Button'
import styles from "./DiscountBarCard.module.css"


interface IDiscountBarCard {
    discount: IDiscount
    setDiscountModal: Function
    refresh: boolean
    setRefresh: Function
}

export const DiscountBarCard: FC<IDiscountBarCard> = ({ discount, setDiscountModal, refresh, setRefresh }) => {
    const setActiveDiscount = useDiscountStore((state) => state.setActiveDiscount)
    const handleDeleteDiscount = async () => {
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
                await deleteDiscountById(discount.id!.toString())
                Swal.fire({
                    title: "Descuento eliminado",
                    icon: "success"
                });
                setRefresh(!refresh)
            }
        });
    }
    const handleOpenEditModal = () => {
        setActiveDiscount(discount)
        setDiscountModal(true)
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p><b>Porcentaje:</b> {discount.descuento}</p>
                <p><b>Inicia:</b> {new Date(discount.fechaInicio.toString()).toLocaleDateString()}</p>
                <p><b>Termina:</b> {new Date(discount.fechaCierre.toString()).toLocaleDateString()}</p>
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
