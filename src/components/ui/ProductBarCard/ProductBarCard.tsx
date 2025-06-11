import { FC } from 'react'
import { IProduct } from '../../../types/IProduct'
import { Button } from '../Button/Button'
import styles from "./ProductBarCard.module.css"
import { useProductStore } from '../../../store/productStore'
import Swal from 'sweetalert2'
import { deleteProductById, getProductById } from '../../../http/productRequest'
interface ProductBarCard {
    product: IProduct
}
export const ProductBarCard: FC<ProductBarCard> = ({ product }) => {
    const setActiveProduct = useProductStore(state => state.setActiveProduct)
    const handleSetActiveProduct = () => {
        setActiveProduct(product)
    }
        const handleDeleteProduct=async()=>{
            Swal.fire({
                title: "¿Seguro?",
                text: "Esta accion es irreversible",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                cancelButtonText:"Cancelar",
                confirmButtonText: "Eliminar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteProductById(product.id!.toString())
                    const response = await getProductById(product.id!.toString())
                    if(response.id){
                        Swal.fire({
                        title: "Ocurrio un error durante la eliminacion de un producto",
                        icon: "error"
                        });
                    }else{
                        Swal.fire({
                        title: "Producto Eliminada",
                        icon: "success"
                    });
                    }
                    
                }
            });
        }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p>Nombre:{product.nombre}</p>
                <div>
                    <p>Categorias:</p>
                    {product.categorias.map((el)=>(<p key={el.id}>{el.nombre}</p>)) }
                </div>
                <p>Stock:{product.stock}</p>
                <p>Precio de venta:{product.precio}</p>

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
