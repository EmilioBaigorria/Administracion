import { ChangeEvent, FC, useState } from "react"
import { IDiscount } from "../../../types/IDiscount"
import styles from "./ModalCreateEditDiscount.module.css"
import { createDiscount } from "../../../http/discountRequest"
import { Button } from "../../ui/Button/Button"
interface ICreateDiscount{
    fechaCierre:string,
    fechaInicio:string
    descuento:number,
}

const initialValues: ICreateDiscount = {
    fechaCierre:"",
    fechaInicio:"",
    descuento:0,
}
interface IModalCreateEditeDiscount {
    isOpen: boolean,
    onClose: Function
}

export const ModalCreateEditDiscount:FC<IModalCreateEditeDiscount> = ({isOpen,onClose}) => {
  const [workingDicount, setWorkingDicount] = useState<ICreateDiscount>(initialValues)

    const handleClose = () => {
        setWorkingDicount(initialValues)
        onClose(false)
    }
    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setWorkingDicount((prev) => ({ ...prev, [`${name}`]: value }))
    }
    const handleSave=async ()=>{
        const newDiscount:IDiscount={
            fechaInicio:new Date(workingDicount.fechaInicio),
            fechaCierre:new Date(workingDicount.fechaCierre),
            descuento:workingDicount.descuento,
            productos:[]
        }
        console.log(newDiscount)
        const response=await createDiscount(newDiscount)
        if(response){
            handleClose()
        }
    }
    return (
        <div className={styles.background} style={{ display: isOpen ? "" : "none" }}>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <p>{workingDicount.descuento == 0 ? "Añadir descuento" : "Editar descuento"}</p>
                    <div className={styles.header_X} onClick={handleClose}>✖</div>
                </div>
                <div className={styles.mainContentContainer}>
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Descuento:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="descuento" value={workingDicount.descuento} onChange={handleChangeInputs} />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Empieza:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="date"
                                name="fechaInicio" value={workingDicount.fechaInicio} onChange={handleChangeInputs} />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Termina:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="date"
                                name="fechaCierre" value={workingDicount.fechaCierre} onChange={handleChangeInputs} />
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
