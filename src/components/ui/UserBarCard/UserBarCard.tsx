import { FC } from 'react'
import styles from "./UserBarCard.module.css"
import { IUser } from '../../../types/IUser'
import { Button } from '../Button/Button'
import Swal from 'sweetalert2'
import { useModalUserStore } from '../../../store/modalUserStore'
import { deleteUserById } from '../../../http/userRequest'
interface IUserBarCard{
    user:IUser
    setUserModal:Function
}
export const UserBarCard:FC<IUserBarCard> = ({user,setUserModal}) => {
  const setActiveUser=useModalUserStore((state)=>state.setModalUser)
    const handleDeleteCategorie=async()=>{
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
                const response=await deleteUserById(user.id!.toString())
                if(response?.message){
                    Swal.fire({
                    title: "Usuario Eliminado",
                    icon: "success"
                    });
                    setUserModal(false)
                }else{
                    Swal.fire({
                    title: "El usuario no pudo ser elminado",
                    icon: "warning"
                });
                }
                
            }
        });
    }
    const handleOpenEditModal=()=>{
        setActiveUser(user)
        setUserModal(true)
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p><b>Nombre:</b> {`${user.nombre} ${user.apellido}`}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Rol:</b> {user.rol}</p>
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
                } styleSet={false} action={handleDeleteCategorie} />
            </div>
        </div>
    )
}
