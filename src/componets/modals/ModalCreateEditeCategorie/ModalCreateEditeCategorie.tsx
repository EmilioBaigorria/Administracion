import { ChangeEvent, FC, useState } from "react"
import styles from "./ModalCreateEditeCategorie.module.css"
import { ICategories } from "../../../types/ICategories"
import { Button } from "../../ui/Button/Button"
const initialValues: ICategories = {
    id: "",
    nombre: ""
}
interface IModalCreateEditeCategorie {
    isOpen: boolean,
    onClose: Function
}
export const ModalCreateEditeCategorie: FC<IModalCreateEditeCategorie> = ({ isOpen, onClose }) => {

    const [workingCategorie, setWorkingCategorie] = useState<ICategories>(initialValues)

    const handleClose = () => {
        onClose(false)
    }
    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setWorkingCategorie((prev) => ({ ...prev, [`${name}`]: value }))
        console.log(workingCategorie)
    }
    return (
        <div className={styles.background} style={{ display: isOpen ? "" : "none" }}>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <p>{workingCategorie.nombre == "" ? "Añadir producto" : "Editar producto"}</p>
                    <div className={styles.header_X} onClick={handleClose}>✖</div>
                </div>
                <div className={styles.mainContentContainer}>
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Nombre:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="nombre" value={workingCategorie.nombre} onChange={handleChangeInputs} />
                        </div>
                    </div>
                    <div className={styles.bottomButtonsContaner}>
                        <Button text="Cancelar" action={() => { }} styleSet={false} />
                        <Button text="Crear" action={() => { }} styleSet={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}
