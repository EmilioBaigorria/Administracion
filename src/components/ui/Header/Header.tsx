import { useUserStore } from "../../../store/userStore"
import styles from "./Header.module.css"

export const Header = () => {
  let user = useUserStore((state) => state.actireUser?.nombre)
  return (
    <div className={styles.mainHeaderContainer}>
        <div style={{display: "flex", alignItems:"center", gap:"0.5rem"}}>
            <img className={styles.img} src="../../../assets/vetra_logo.svg"/> <strong style={{fontSize:"larger"}}>ADMINISTRACIÓN</strong>
        </div>
        <div className={styles.userManagmentContainer}>
            <p>Cuenta admin:{user}</p>
        </div>
    </div>
  )
}
