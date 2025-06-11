import { useNavigate } from "react-router"
import { Button } from "../Button/Button"
import styles from "./Sidebar.module.css"

export const Sidebar = () => {
  const navigate=useNavigate()
  return (
    <div className={styles.mainContainer}>   
        <div className={styles.buttonsContainer}>
            <Button text="Productos" action={()=>{navigate("/products")}}/>
            <Button text="Categorias" action={()=>{navigate("/categories")}}/>
            <Button text="Talles" action={()=>{navigate("/talles")}}/>
            <Button text="Descuentos" action={()=>{navigate("/descuento")}}/>
        </div>
    </div>
  )
}
