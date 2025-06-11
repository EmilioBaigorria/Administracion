import { ChangeEvent, FC, useEffect, useState } from "react"
import styles from "./ModalCreateEditeCategorie.module.css"
import { ICategories } from "../../../types/ICategories"
import { Button } from "../../ui/Button/Button"
import { createCategorie, updateCategorie } from "../../../http/categorieRequest"
import { useCategorieStore } from "../../../store/categorieStore"
import Swal from "sweetalert2"
const initialValues: ICategories = {
    id: 0,
    nombre: ""
}
interface IModalCreateEditeCategorie {
    isOpen: boolean,
    onClose: Function
}
export const ModalCreateEditeCategorie: FC<IModalCreateEditeCategorie> = ({ isOpen, onClose }) => {

    const activeCategorie=useCategorieStore((state)=>state.activeCategorie)
    const removeCategorie=useCategorieStore((state)=>state.deleteCategorie)

    const [workingCategorie, setWorkingCategorie] = useState<ICategories>(initialValues)
    
    const handleClose = () => {
        setWorkingCategorie(initialValues)
        removeCategorie()
        onClose(false)
    }
    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setWorkingCategorie((prev) => ({ ...prev, [`${name}`]: value }))
    }
    const handleSave=async ()=>{
        if(activeCategorie){
            const response=await updateCategorie(workingCategorie)
            if(response){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Categoria Actualizada",
                    showConfirmButton: false,
                timer: 1500
                });
                handleClose()
            }
        }else{
            const newCategorie:ICategories={
                nombre:workingCategorie.nombre
            }
            const response=await createCategorie(newCategorie)
            if(response){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Categoria Creada",
                    showConfirmButton: false,
                timer: 1500
                });
                handleClose()
            }
        }
        
    }
    useEffect(()=>{
        if(activeCategorie){
            setWorkingCategorie(activeCategorie)
        }
    },[activeCategorie])
    return (
        <div className={styles.background} style={{ display: isOpen ? "" : "none" }}>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <p>{workingCategorie.id ? "Editar categoria" : "Añadir Categoria"}</p>
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
                        <Button text="Cancelar" action={handleClose} styleSet={false} />
                        <Button text={workingCategorie.id?"Editar":"Crear"} action={handleSave } styleSet={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}
