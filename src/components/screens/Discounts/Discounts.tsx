import styles from "./Discounts.module.css"
import { Header } from '../../ui/Header/Header'
import { Sidebar } from '../../ui/Sidebar/Sidebar'
import { useEffect, useState } from "react"
import { DiscountListing } from "../../ui/DiscountListing/DiscountListing"
import { ModalCreateEditDiscount } from "../../modals/ModalCreateEditDiscount/ModalCreateEditDiscount"
import { useUserStore } from "../../../store/userStore"
import { IUser } from "../../../types/IUser"
import { getAllUsers } from "../../../http/userRequest"
import { useNavigate } from "react-router"
import { tokenIsExpired } from "../../../services/jwtService"
import { refreshToken } from "../../../services/tokenService"

export const Discounts = () => {

  const navigate=useNavigate()
  
  const [discountModal,setDiscountModal]=useState(false)

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
      <ModalCreateEditDiscount isOpen={discountModal} onClose={()=>setDiscountModal(false)}/>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <Sidebar />
        <DiscountListing setDiscountModal={setDiscountModal} discountModal={discountModal} />
      </div>
    </div>
  )
}
