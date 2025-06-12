import { useNavigate } from "react-router"
import { useUserStore } from "../../../store/userStore"
import { Button } from "../Button/Button"
import styles from "./Header.module.css"

export const Header = () => {
  const navigate=useNavigate()
  let user = useUserStore((state) => state.actireUser?.nombre)
  let deleteUser = useUserStore((state) => state.deleteUser)
  const handleLogout=()=>{
    deleteUser()
    localStorage.clear()
    navigate('/')
  }
  return (
    <div className={styles.mainHeaderContainer}>
        <div style={{display: "flex", alignItems:"center", gap:"0.5rem"}}>
            <img className={styles.img} src="../../../assets/vetra_logo.svg"/> <strong style={{fontSize:"larger"}}>ADMINISTRACIÓN</strong>
        </div>
        <div className={styles.userManagmentContainer}>
            <p>Logueado como: {user}</p>
            <div className={styles.userManagmentContainer_logoutbutton}>
              <Button icon={
                <span className="material-symbols-outlined">
                  logout
                </span>
              } action={handleLogout}/>
            </div>
        </div>
    </div>
  )
}
