import { useState } from "react"
import { ModalCrearEditarProducto } from "../../modals/ModalCrearEditarProducto/ModalCrearEditarProducto"
import { Header } from "../../ui/Header/Header"
import { ProductListing } from "../../ui/ProductListing/ProductListing"
import { Sidebar } from "../../ui/Sidebar/Sidebar"
import styles from "./Products.module.css"


export const Products = () => {
  const [productModal, setProductModal] = useState(false)
  const test= async()=>{
    const response=null
    console.log(response)
  }
  return (
    <div className={styles.mainContainer}>
      <button onClick={test}>test</button>
      <ModalCrearEditarProducto isOpen={productModal} onClose={() => setProductModal(false)} />
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <Sidebar />
        <ProductListing setProductModal={setProductModal} />
      </div>
    </div>
  )
}
