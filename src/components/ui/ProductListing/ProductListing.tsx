import { FC, useEffect, useState } from "react"
import { getAllProducts } from "../../../http/productRequest"
import { IProduct } from "../../../types/IProduct"
import { Button } from "../Button/Button"
import { ProductBarCard } from "../ProductBarCard/ProductBarCard"
import styles from "./ProductListing.module.css"
interface IProductListing {
    setProductModal: Function,
    productModal: boolean
}
export const ProductListing: FC<IProductListing> = ({ setProductModal, productModal }) => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [refresh, setRefresh] = useState<boolean>(false)
    const getProducts = async () => {
        const productsData = await getAllProducts()
        setProducts(productsData)
    }
    useEffect(() => {
        getProducts()
    }, [productModal, refresh])
    return (
        <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Productos</p>
                </div>
                <div>
                    <Button text="Agregar producto" action={() => setProductModal(true)} styleSet={false} />
                </div>
            </div>
            <div className={styles.productsContainer}>
                {products.map((el, key) => (
                    <ProductBarCard key={key} product={el} refresh={refresh} setRefresh={setRefresh}/>
                ))}
            </div>
        </div>
    )
}
