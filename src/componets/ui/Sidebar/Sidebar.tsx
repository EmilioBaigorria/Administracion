import { Button } from "../Button/Button"
import styles from "./Sidebar.module.css"

export const Sidebar = () => {
  return (
    <div className={styles.mainContainer}>   
        <div className={styles.buttonsContainer}>
            <Button text="Productos" action={()=>{}}/>
            <Button text="Categorias" action={()=>{}}/>
        </div>
    </div>
  )
}
