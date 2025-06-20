import { FC, useEffect, useState } from "react"
import { getAllUsers } from "../../../http/userRequest"
import { IUser } from "../../../types/IUser"
import { Button } from "../Button/Button"
import { UserBarCard } from "../UserBarCard/UserBarCard"
import styles from "./UserListing.module.css"
interface IUserListing{
  userModal:boolean
  setUserModal:Function
}
export const UserListing:FC<IUserListing> = ({userModal,setUserModal}) => {
  const [users,setUsers]=useState<IUser[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)
    const getUsers=async()=>{
        const allUsers=await getAllUsers()
        setUsers(allUsers)
    }
    useEffect(()=>{
        getUsers()
        
    },[userModal, refresh])

  return (
    <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Usuarios</p>
                </div>
                <div>
                    <Button text="Agregar usuario" action={()=>setUserModal(true)} styleSet={false} />
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                {users.map((el)=>(
                    el.id==1?<div></div>:<UserBarCard key={el.id} user={el} setUserModal={setUserModal} refresh={refresh} setRefresh={setRefresh}/>
                ))}
            </div>
        </div>
  )
}
