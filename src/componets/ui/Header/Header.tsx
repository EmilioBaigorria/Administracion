import { useUserStore } from "../../../store/userStore"
import styles from "./Header.module.css"

export const Header = () => {
  let user = useUserStore((state) => state.actireUser?.nombre)
  return (
    <div className={styles.mainHeaderContainer}>
        <div>
            <img className={styles.img} src="../../../assets/vetra_logo.svg"/>
        </div>
        <div className={styles.userManagmentContainer}>
            <p>{user}</p>
        </div>
    </div>
  )
}
