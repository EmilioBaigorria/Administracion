import { FC } from "react"
import { ISize } from "../../../types/ISize"
import { Button } from "../Button/Button"
import styles from "./SizeBarCard.module.css"
interface ISizeBarCard{
    size:ISize
}
export const SizeBarCard:FC<ISizeBarCard> = ({ size }) => {
    
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p>Nombre:{size.talle}</p>

            </div>
            <div className={styles.buttonsContainer}>

                <Button icon={
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                } action={()=>{ }}
                styleSet={false} />
                <Button icon={
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                } action={() => { }}
                styleSet={false} />

            </div>
        </div>
    )
}
