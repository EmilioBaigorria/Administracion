import { useEffect, useState } from "react"
import styles from "./ProductListing.module.css"
import { enumCategoria, IProduct } from "../../../types/IProduct"
import { Button } from "../Button/Button"
import { ProductBarCard } from "../ProductBarCard/ProductBarCard"

export const ProductListing = () => {
    const exampleProduct: IProduct = {
        id: Date.toString(),
        nombre: "ExampleName",
        stock: 2,
        precio: 150000,
        descripcion: "ExampleDesc",
        categoria: enumCategoria.DEPORTIVAS,
        talle: "38",
        color: ["red", "blue", "yellow"],
        marca: "Adidas",
        id_descuento_producto: "none",
        id_talle_producto: "none"
    }
    const productMock: IProduct[] = [exampleProduct, exampleProduct]
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        setProducts(productMock)
    }, [])
    return (
        <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Productos</p>
                </div>
                <div>
                    <Button text="Agregar producto" action={() => { }} styleSet={false} />
                </div>
            </div>
            <div className={styles.productsContainer}>
                {products.map((el)=>(
                    <ProductBarCard product={el}/>
                ))}
            </div>
        </div>
    )
}
