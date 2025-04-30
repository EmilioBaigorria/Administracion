import React, { FC } from 'react'
import { IProduct } from '../../../types/IProduct'
import { Button } from '../Button/Button'
import styles from "./ProductBarCard.module.css"
interface ProductBarCard {
    product: IProduct
}
export const ProductBarCard: FC<ProductBarCard> = ({ product }) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>

                <p>Nombre:{product.nombre}</p>
                <p>Categoria:{product.categoria}</p>
                <p>Stock:{product.stock}</p>
                <p>Precio de venta:{product.precio}</p>

            </div>
            <div className={styles.buttonsContainer}>

                <Button icon={
                    <span className="material-symbols-outlined">
                    edit
                    </span>
                } action={() => { }} />
                <Button icon={
                    <span className="material-symbols-outlined">
                    delete
                    </span>
                } action={() => { }} />

            </div>
        </div>
    )
}
