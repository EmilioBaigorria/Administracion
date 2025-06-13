import { FC } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { deleteUserById, updateUser } from '../../../http/userRequest'
import { useModalUserStore } from '../../../store/modalUserStore'
import { IUser } from '../../../types/IUser'
import { Button } from '../Button/Button'
import styles from "./UserBarCard.module.css"
interface IUserBarCard {
    user: IUser
    setUserModal: Function
    refresh: boolean
    setRefresh: Function
}
export const UserBarCard: FC<IUserBarCard> = ({ user, setUserModal, refresh, setRefresh }) => {
    const setActiveUser = useModalUserStore((state) => state.setModalUser)
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
                const response = await deleteUserById(user.id!.toString())
                if (response?.message) {
                    Swal.fire({
                        title: "Usuario eliminado",
                        icon: "success"
                    });
                    setRefresh(!refresh)
                } else {
                    Swal.fire({
                        title: "El usuario no pudo ser elminado",
                        icon: "warning"
                    });
                }

            }
        });
        
    }
    const handleOpenEditModal = () => {
        setActiveUser(user)
        setUserModal(true)
    }

    const handleChangeRole = async () => {
        if (user.rol == "ADMIN") {
            await updateUser({ ...user, rol: "USUARIO" })
            setRefresh(!refresh)
        } else {
            await updateUser({ ...user, rol: "ADMIN" })
            setRefresh(!refresh)
        }

    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p><b>Nombre:</b> {`${user.nombre} ${user.apellido}`}</p>
                <p><b>Email:</b> {user.email}</p>
                {user.rol == "USUARIO"
                    ? <p className={styles.notAdmin}><b>Rol:</b> {user.rol}</p>
                    : <p className={styles.adminRole}><b>Rol:</b><i> {user.rol}</i></p>}
            </div>
            <div className={styles.buttonsContainer}>
                {user.rol == "ADMIN"
                    ? <Button icon={
                        <FaLockOpen size={25} />
                    } styleSet={false} action={handleChangeRole} />
                    : <Button icon={
                        <FaLock size={25} />
                    } styleSet={false} action={handleChangeRole} />}
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
