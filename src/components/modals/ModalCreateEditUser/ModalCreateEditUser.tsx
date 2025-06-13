import { ChangeEvent, FC, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import Swal from "sweetalert2";
import { createUser, updateUser } from "../../../http/userRequest";
import { useModalUserStore } from "../../../store/modalUserStore";
import { IAdress } from "../../../types/IAdress";
import { IUser, ROLE } from "../../../types/IUser";
import { Button } from "../../ui/Button/Button";
import styles from "./ModalCreateEditUser.module.css";


type OptionType = {
    value: string;
    label: string;
}
const ROLES: OptionType[] = [
    { value: "ADMIN", label: "Administrador" },
    { value: "USUARIO", label: "Usuario" },
]
//Estos estilos fueron proporcionados por chat gpt y modificados ligeramente por mi
const customStyles: StylesConfig<OptionType, true> = {
    control: (base, state) => ({
        ...base,
        minHeight: '28px',
        height: '40px',
        minWidth: '18rem',
        width: '100%',
        backgroundColor: 'white',
        borderColor: state.isFocused ? 'blue' : 'gray',
        boxShadow: state.isFocused ? '0 0 0 1px blue' : undefined,
        fontSize: '0.9rem',
        padding: '0 4px',
        alignItems: 'center',
        '&:hover': {
            borderColor: 'blue',
        },
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '0 6px',
        fontSize: '0.6rem',
    }),
    input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
        fontSize: '0.6rem',
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: '0.6rem',
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
        padding: '1px 4px',
        fontSize: '0.6rem',
    }),
    multiValueLabel: (base) => ({
        ...base,
        padding: '0 2px',
        fontSize: '0.6rem',
    }),
    multiValueRemove: (base) => ({
        ...base,
        padding: '0 2px',
        fontSize: '0.6rem',
        ':hover': {
            backgroundColor: 'red',
            color: 'white',
        },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused
            ? 'lightblue'
            : state.isSelected
                ? 'blue'
                : 'white',
        color: state.isSelected ? 'white' : 'black',
        fontSize: '0.6rem',
        padding: '6px 8px',
    }),
    menu: (base) => ({
        ...base,
        fontSize: '0.6rem',
        zIndex: 9999,
    }),
};
interface ICreateUser {
    id?: string,
    nombre: string
    apellido: string
    email: string
    password: string
    confirmPassword: string
    rol: string | ROLE
    direcciones: IAdress[]
}
const initialValues: ICreateUser = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "",
    direcciones: []

}
interface IModalCreateEditUser {
    isOpen: boolean,
    onClose: Function
}

export const ModalCreateEditUser: FC<IModalCreateEditUser> = ({ isOpen, onClose }) => {

    const activeUser = useModalUserStore((state) => state.modalUser)
    const removeUser = useModalUserStore((state) => state.deleteModalUser)

    const [workingUser, setWorkingUser] = useState<ICreateUser>(initialValues)

    const [selectedRole, setSelectedRole] = useState<OptionType>({ value: "USUARIO", label: "Usuario" })

    const [errorMessage, setErrorMessage] = useState<string>("")

    const [hidePass, setHidePass] = useState<boolean>(true)



    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setWorkingUser((prev) => ({ ...prev, [`${name}`]: value }))
    }

    const handleSave = async () => {
        if (workingUser.password != workingUser.confirmPassword) {
            setErrorMessage("Las contraseñas deben coincidir")
            return
        }
        if (activeUser) {
            const updatedUser: IUser = {
                id: activeUser.id,
                nombre: workingUser.nombre,
                apellido: workingUser.apellido,
                email: workingUser.email,
                password: activeUser.password,
                rol: selectedRole?.value,
                direcciones: activeUser.direcciones
            }
            await updateUser(updatedUser)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuario actualizado",
                showConfirmButton: false,
                timer: 1500
            });
            handleClose()
        } else {
            const newUser: IUser = {
                nombre: workingUser.nombre,
                apellido: workingUser.apellido,
                email: workingUser.email,
                password: workingUser.password,
                rol: selectedRole?.value,
                direcciones: []
            }
            await createUser(newUser)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Usuario creado",
                showConfirmButton: false,
                timer: 1500
            });
            handleClose()

        }

    }

    const handleClose = () => {
        setWorkingUser(initialValues)
        removeUser()
        onClose()
    }

    useEffect(() => {
        if (activeUser) {
            let parsedWorkingUser: ICreateUser = {
                id: activeUser.id?.toString(),
                nombre: activeUser.nombre,
                apellido: activeUser.apellido,
                email: activeUser.email,
                password: activeUser.password,
                confirmPassword: activeUser.password,
                rol: activeUser.rol,
                direcciones: activeUser.direcciones
            }
            setSelectedRole(activeUser.rol == "ADMIN" ? { value: "ADMIN", label: "Administrador" } : { value: "USUARIO", label: "Usuario" })
            setWorkingUser(parsedWorkingUser)
        }
    }, [activeUser])
    return (
        <div className={styles.background} style={{ display: isOpen ? "" : "none" }}>
            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <p>{!workingUser.id ? "Añadir producto" : "Editar producto"}</p>
                    <div className={styles.header_X} onClick={handleClose}>✖</div>
                </div>
                <div className={styles.mainContentContainer}>
                    {errorMessage != "" ? <p className={styles.errorMessage}>{errorMessage}</p> : <div></div>}
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Nombre:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="nombre" value={workingUser.nombre} onChange={handleChangeInputs} />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Apellido:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="apellido" value={workingUser.apellido} onChange={handleChangeInputs} />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Email:</p>
                            <input className={styles.inputsContainer_inputContainer_input} type="text"
                                name="email" value={workingUser.email} onChange={handleChangeInputs} />
                        </div>
                        <div className={styles.inputsContainer_inputContainer}>
                            <p className={styles.inputsContainer_inputContainer_label}>Rol:</p>
                            <Select className={styles.dropdown}
                                styles={customStyles}
                                options={ROLES}
                                value={selectedRole}
                                onChange={(newValues) => setSelectedRole(newValues)}
                            />
                        </div>
                        {workingUser.id ? <div></div> :
                            <div className={styles.inputsContainer_inputContainer}>
                                <p className={styles.inputsContainer_inputContainer_label}>Contraseña:</p>
                                <input className={styles.inputsContainer_inputContainer_input} type={hidePass ? "password" : "text"}
                                    name="password" value={workingUser.password} onChange={handleChangeInputs} />
                                <Button icon={hidePass ?
                                    <span className="material-symbols-outlined">
                                        visibility_off
                                    </span> :
                                    <span className="material-symbols-outlined">
                                        visibility
                                    </span>
                                } action={() => setHidePass(!hidePass)} styleSet={false} />
                            </div>}
                        {workingUser.id ? <div></div> :
                            <div className={styles.inputsContainer_inputContainer}>
                                <p className={styles.inputsContainer_inputContainer_label}>Confirma contraseña:</p>
                                <input className={styles.inputsContainer_inputContainer_input} type={hidePass ? "password" : "text"}
                                    name="confirmPassword" value={workingUser.confirmPassword} onChange={handleChangeInputs} />
                                <Button icon={hidePass ?
                                    <span className="material-symbols-outlined">
                                        visibility_off
                                    </span> :
                                    <span className="material-symbols-outlined">
                                        visibility
                                    </span>
                                } action={() => setHidePass(!hidePass)} styleSet={false} />
                            </div>}
                    </div>
                    <div className={styles.bottomButtonsContaner}>
                        <Button text="Cancelar" action={handleClose} styleSet={false} />
                        <Button text={workingUser.id ? "Editar" : "Crear"} action={handleSave} styleSet={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}
