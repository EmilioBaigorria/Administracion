import styles from "./DiscountBarCard.module.css"
import { Button } from '../Button/Button'
import { IDiscount } from "../../../types/IDiscount"
import { FC } from "react"

interface IDiscountBarCard {
    discount: IDiscount
}

export const DiscountBarCard:FC<IDiscountBarCard> = ({discount}) => {
  return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p>Porcentaje:{discount.descuento}</p>
                <p>Inicia:{new Date(discount.fechaInicio.toString()).toLocaleDateString()}</p>
                <p>Termina:{new Date(discount.fechaInicio.toString()).toLocaleDateString()}</p>
            </div>
            <div className={styles.buttonsContainer}>
                <Button icon={
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                } styleSet={false} action={() => { }} />
                <Button icon={
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                } styleSet={false} action={() => { }} />
            </div>
        </div>
    )
}
