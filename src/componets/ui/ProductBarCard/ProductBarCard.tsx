import { FC } from 'react'
import { IProduct } from '../../../types/IProduct'
import { Button } from '../Button/Button'
import styles from "./ProductBarCard.module.css"
import { useProductStore } from '../../../store/productStore'
interface ProductBarCard {
    product: IProduct
}
export const ProductBarCard: FC<ProductBarCard> = ({ product }) => {
    const setActiveProduct = useProductStore(state => state.setActiveProduct)
    const handleSetActiveProduct = () => {
        setActiveProduct(product)
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>

                <p>Nombre:{product.nombre}</p>
                <p>Categorias:{ }</p>
                <p>Stock:{product.stock}</p>
                <p>Precio de venta:{product.precio}</p>

            </div>
            <div className={styles.buttonsContainer}>

                <Button icon={
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                } action={handleSetActiveProduct} />
                <Button icon={
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                } action={() => { }} />

            </div>
        </div>
    )
}
