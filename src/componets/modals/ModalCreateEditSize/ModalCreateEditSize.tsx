import { ChangeEvent, FC, useState } from "react"
import { ISize } from "../../../types/ISize"
import { Button } from "../../ui/Button/Button"
import styles from "./ModalCreateEditSize.module.css"
import { createSize } from "../../../http/sizeRequest"

const initialValues: ISize = {
    id: "",
    talle:""
}
interface IModalCreateEditeSize {
    isOpen: boolean,
    onClose: Function
}

export const ModalCreateEditSize:FC<IModalCreateEditeSize> = ({isOpen,onClose}) => {
  
    const [workingSize, setWorkingSize] = useState<ISize>(initialValues)

    const handleClose = () => {
        setWorkingSize(initialValues)
        onClose(false)
    }
    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setWorkingSize((prev) => ({ ...prev, [`${name}`]: value }))
    }
    const handleSave=async ()=>{
        const newSize:ISize={
            talle:workingSize.talle
        }
        const response=await createSize(newSize)
        if(response){
            handleClose()
        }
    }
    return (
        <div className={styles.background} style={{ display: isOpen ? "" : "none" }}>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <p>{workingSize.talle == "" ? "Añadir talle" : "Editar talle"}</p>
                    <div className={styles.header_X} onClick={handleClose}>✖</div>
                </div>
                <div className={styles.mainContentContainer}>
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Nombre:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="talle" value={workingSize.talle} onChange={handleChangeInputs} />
                        </div>
                    </div>
                    <div className={styles.bottomButtonsContaner}>
                        <Button text="Cancelar" action={handleClose} styleSet={false} />
                        <Button text="Crear" action={handleSave } styleSet={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}
