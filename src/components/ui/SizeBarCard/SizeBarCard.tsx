import { FC } from "react"
import Swal from "sweetalert2"
import { deleteSizeById } from "../../../http/sizeRequest"
import { useSizeStore } from "../../../store/sizeStore"
import { ISize } from "../../../types/ISize"
import { Button } from "../Button/Button"
import styles from "./SizeBarCard.module.css"
interface ISizeBarCard {
    size: ISize
    setSizeModal: Function
    refresh: boolean
    setRefresh: Function
}
export const SizeBarCard: FC<ISizeBarCard> = ({ size, setSizeModal, refresh, setRefresh }) => {
    const setActiveSize = useSizeStore((state) => state.setActiveSize)
    const handleDeleteSize = async () => {
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
                await deleteSizeById(size.id!.toString())
                Swal.fire({
                    title: "Talle eliminado",
                    icon: "success"
                });
                setRefresh(!refresh)
            }
        });
    }
    const handleOpenEditModal = () => {
        setActiveSize(size)
        setSizeModal(true)
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p><b>Nombre:</b> {size.talle}</p>

            </div>
            <div className={styles.buttonsContainer}>

                <Button icon={
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                } action={handleOpenEditModal}
                    styleSet={false} />
                <Button icon={
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                } action={handleDeleteSize}
                    styleSet={false} />

            </div>
        </div>
    )
}
