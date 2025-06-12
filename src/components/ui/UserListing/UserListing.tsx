import { FC, useEffect, useState } from "react"
import styles from "./UserListing.module.css"
import { Button } from "../Button/Button"
import { IUser } from "../../../types/IUser"
import { getAllUsers } from "../../../http/userRequest"
import { UserBarCard } from "../UserBarCard/UserBarCard"
interface IUserListing{
  userModal:boolean
  setUserModal:Function
}
export const UserListing:FC<IUserListing> = ({userModal,setUserModal}) => {
  const [users,setUsers]=useState<IUser[]>([])
    const getUsers=async()=>{
        const allUsers=await getAllUsers()
        setUsers(allUsers)
    }
    useEffect(()=>{
        getUsers()
    },[userModal])

  return (
    <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Usuarios</p>
                </div>
                <div>
                    <Button text="Agregar Usuario" action={()=>setUserModal(true)} styleSet={false} />
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                {users.map((el)=>(
                    el.id==1?<div></div>:<UserBarCard key={el.id} user={el} setUserModal={setUserModal}/>
                ))}
            </div>
        </div>
  )
}
