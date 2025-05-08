import { ModalCrearEditarProducto } from "../../modals/ModalCrearEditarProducto/ModalCrearEditarProducto"
import { Header } from "../../ui/Header/Header"
import { ProductListing } from "../../ui/ProductListing/ProductListing"
import { Sidebar } from "../../ui/Sidebar/Sidebar"
import styles from "./Products.module.css"

export const Products = () => {
  return (
    <div className={styles.mainContainer}>
      <ModalCrearEditarProducto />
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <Sidebar />
        <ProductListing />
      </div>
    </div>
  )
}
