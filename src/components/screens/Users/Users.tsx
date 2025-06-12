import { useEffect, useState } from "react"
import { ModalCreateEditUser } from "../../modals/ModalCreateEditUser/ModalCreateEditUser"
import { Header } from "../../ui/Header/Header"
import { Sidebar } from "../../ui/Sidebar/Sidebar"
import styles from "./Users.module.css"
import { UserListing } from "../../ui/UserListing/UserListing"
import { useUserStore } from "../../../store/userStore"
import { IUser } from "../../../types/IUser"
import { getAllUsers } from "../../../http/userRequest"
import { useNavigate } from "react-router"
import { refreshToken } from "../../../services/tokenService"
import { tokenIsExpired } from "../../../services/jwtService"

export const Users = () => {
  const [userModal,setUserModal]=useState(false)

  const navigate=useNavigate()

  const setActiveUser=useUserStore((state)=>state.setActiveUser)
  
    const refreshUser=async()=>{
        const token=localStorage.getItem('token')
        if(token){
            if(tokenIsExpired(token)){
              refreshToken()
            }
            const userId=localStorage.getItem('userId')
            const users: IUser[] = await getAllUsers();
            const user = users.find(user => user.id?.toString() === userId);
            setActiveUser(user!)
        }else{
          navigate('/')
        }
      }
      useEffect(()=>{
        refreshUser()
      },[])
  return (
    <div className={styles.mainContainer}>
      <ModalCreateEditUser isOpen={userModal} onClose={()=>setUserModal(false)}/>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <Sidebar />
        <UserListing userModal={userModal} setUserModal={setUserModal}/>
      </div>
    </div>
  )
}
