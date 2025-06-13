import { FC } from 'react'
import Swal from 'sweetalert2'
import { deleteProductById, getProductById } from '../../../http/productRequest'
import { useProductStore } from '../../../store/productStore'
import { IProduct } from '../../../types/IProduct'
import { Button } from '../Button/Button'
import styles from "./ProductBarCard.module.css"
interface ProductBarCard {
    product: IProduct
    refresh: boolean
    setRefresh: Function
    setProductModal: Function
}
export const ProductBarCard: FC<ProductBarCard> = ({ product, refresh, setRefresh, setProductModal }) => {
    const setActiveProduct = useProductStore(state => state.setActiveProduct)
    const handleSetActiveProduct = () => {
        setActiveProduct(product)
        setProductModal(true)
    }
    const handleDeleteProduct = async () => {
        Swal.fire({
            title: "¿Seguro?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteProductById(product.id!.toString())
                const response = await getProductById(product.id!.toString())
                if (response.id) {
                    Swal.fire({
                        title: "Ocurrió un error durante la eliminación de un producto",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Producto eliminado",
                        icon: "success"
                    });
                    setRefresh(!refresh)
                }

            }
        });
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p><b>Nombre:</b> {product.nombre}</p>
                <div>
                    <p>Categorias: </p>
                    {product.categorias.map((el) => (<p key={el.id}>- {el.nombre}</p>))}
                </div>
                <p><b>Stock:</b> {product.stock}</p>
                <p><b>Precio de venta:</b> ${product.precio.toLocaleString("es-ar")}</p>
                {product.descuento!.id !== 1
                    ? <div>
                        <p><b>Descuento:</b> {product.descuento!.descuento}%</p>
                        <p><b>Precio con descuento:</b> ${(product.precio * (1 - product.descuento!.descuento / 100)).toLocaleString("es-ar")}</p>
                    </div>
                    : ""}
            </div>
            <div className={styles.buttonsContainer}>

                <Button icon={
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                } action={handleSetActiveProduct}
                    styleSet={false} />
                <Button icon={
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                } action={handleDeleteProduct}
                    styleSet={false} />

            </div>
        </div>
    )
}
