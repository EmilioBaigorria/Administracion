import { useEffect, useState } from "react"
import { ModalCrearEditarProducto } from "../../modals/ModalCrearEditarProducto/ModalCrearEditarProducto"
import { Header } from "../../ui/Header/Header"
import { ProductListing } from "../../ui/ProductListing/ProductListing"
import { Sidebar } from "../../ui/Sidebar/Sidebar"
import styles from "./Products.module.css"
import { useUserStore } from "../../../store/userStore"
import { getAllUsers } from "../../../http/userRequest"
import { IUser } from "../../../types/IUser"
import { useNavigate } from "react-router"
import { tokenIsExpired } from "../../../services/jwtService"
import { refreshToken } from "../../../services/tokenService"



export const Products = () => {

  const navigate=useNavigate()

  const [productModal, setProductModal] = useState(false)

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
      <ModalCrearEditarProducto isOpen={productModal} onClose={() => setProductModal(false)} />
      <div className={styles.headerContainer}>
        <Header />
        
      </div>
      <div className={styles.contentContainer}>
        <Sidebar />
        <ProductListing setProductModal={setProductModal} productModal={productModal}/>
      </div>
    </div>
  )
}
