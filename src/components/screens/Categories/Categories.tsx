import { useEffect, useState } from "react"
import { ModalCreateEditeCategorie } from "../../modals/ModalCreateEditeCategorie/ModalCreateEditeCategorie"
import { CategorieListing } from "../../ui/CategorieListing/CategorieListing"
import { Header } from "../../ui/Header/Header"
import { Sidebar } from "../../ui/Sidebar/Sidebar"
import styles from "./Categories.module.css"
import { useUserStore } from "../../../store/userStore"
import { IUser } from "../../../types/IUser"
import { getAllUsers } from "../../../http/userRequest"
import { useNavigate } from "react-router"
import { tokenIsExpired } from "../../../services/jwtService"
import { refreshToken } from "../../../services/tokenService"

export const Categories = () => {

  const navigate=useNavigate()

  const [categorieModal,setCategorieModal]=useState(false)

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
      <ModalCreateEditeCategorie isOpen={categorieModal} onClose={setCategorieModal}/>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <Sidebar />
        <CategorieListing setCategorieModal={setCategorieModal} categorieModal={categorieModal}/>
      </div>
    </div>
  )
}
