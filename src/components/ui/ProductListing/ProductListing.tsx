import { FC, useEffect, useState } from "react"
import styles from "./ProductListing.module.css"
import { IProduct } from "../../../types/IProduct"
import { Button } from "../Button/Button"
import { ProductBarCard } from "../ProductBarCard/ProductBarCard"
import { getAllProducts } from "../../../http/productRequest"
interface IProductListing {
    setProductModal: Function,
    productModal:boolean
}
export const ProductListing: FC<IProductListing> = ({ setProductModal,productModal }) => {
    const [products, setProducts] = useState<IProduct[]>([])
    const getProducts=async ()=>{
        const productsData=await getAllProducts()
        setProducts(productsData)
    }
    useEffect(() => {
        getProducts()
    }, [productModal])
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
                    <ProductBarCard key={key} product={el} />
                ))}
            </div>
        </div>
    )
}
