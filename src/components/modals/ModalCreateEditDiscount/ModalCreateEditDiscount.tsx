import { ChangeEvent, FC, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { createDiscount, updateDiscount } from "../../../http/discountRequest"
import { useDiscountStore } from "../../../store/discountStore"
import { IDiscount } from "../../../types/IDiscount"
import { Button } from "../../ui/Button/Button"
import styles from "./ModalCreateEditDiscount.module.css"
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
    const activeDiscount=useDiscountStore((state)=>state.activeDiscount)
    const removeDiscount=useDiscountStore((state)=>state.deleteDiscount)

    const [workingDicount, setWorkingDicount] = useState<ICreateDiscount>(initialValues)

    const handleClose = () => {
        setWorkingDicount(initialValues)
        removeDiscount()
        onClose(false)
    }
    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setWorkingDicount((prev) => ({ ...prev, [`${name}`]: value }))
    }
    const handleSave=async ()=>{
        if(activeDiscount){
            const updatedDiscount:IDiscount={
                id:activeDiscount.id,
                fechaInicio:new Date(workingDicount.fechaInicio),
                fechaCierre:new Date(workingDicount.fechaCierre),
                descuento:workingDicount.descuento,
                productos:[]
            }
            const response=await updateDiscount(updatedDiscount)
            if(response){
                Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Descuento actualizado",
                showConfirmButton: false,
                timer: 1500
                });
                handleClose()
            }
        }else{
            const newDiscount:IDiscount={
                fechaInicio:new Date(workingDicount.fechaInicio),
                fechaCierre:new Date(workingDicount.fechaCierre),
                descuento:workingDicount.descuento,
                productos:[]
            }
            const response=await createDiscount(newDiscount)
            if(response){
                Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Descuento creado",
                showConfirmButton: false,
                timer: 1500
                });
                handleClose()
            }
        }
    
    }
    const convertirFecha=(date: string): string =>{
        const [dia, mes, anio] = date.split('/').map(Number);

        const diaConCero = dia.toString().padStart(2, '0');
        const mesConCero = mes.toString().padStart(2, '0');

        return `${anio}-${mesConCero}-${diaConCero}`;
    }
    useEffect(()=>{
        if(activeDiscount){
            const parseDiscount:ICreateDiscount={
                fechaInicio:convertirFecha(new Date(activeDiscount.fechaInicio).toLocaleDateString()),
                fechaCierre:convertirFecha(new Date(activeDiscount.fechaCierre).toLocaleDateString()),
                descuento:activeDiscount.descuento
            }
            setWorkingDicount(parseDiscount)
        }
    },[activeDiscount])

    return (
        <div className={styles.background} style={{ display: isOpen ? "" : "none" }}>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <p>{!activeDiscount ? "Añadir descuento" : "Editar descuento"}</p>
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
                        <Button text={activeDiscount?"Editar":"Crear"} action={handleSave } styleSet={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}
