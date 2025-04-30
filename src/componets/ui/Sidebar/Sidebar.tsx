import { useNavigate } from "react-router"
import { Button } from "../Button/Button"
import styles from "./Sidebar.module.css"

export const Sidebar = () => {
  const navigate=useNavigate()
  return (
    <div className={styles.mainContainer}>   
        <div className={styles.buttonsContainer}>
            <Button text="Productos" action={()=>{navigate("/")}}/>
            <Button text="Categorias" action={()=>{navigate("/categories")}}/>
        </div>
    </div>
  )
}
