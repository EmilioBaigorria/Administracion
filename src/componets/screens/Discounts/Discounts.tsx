import styles from "./Discounts.module.css"
import { Header } from '../../ui/Header/Header'
import { Sidebar } from '../../ui/Sidebar/Sidebar'
import { useState } from "react"
import { DiscountListing } from "../../ui/DiscountListing/DiscountListing"
import { ModalCreateEditDiscount } from "../../modals/ModalCreateEditDiscount/ModalCreateEditDiscount"

export const Discounts = () => {
  const [discountModal,setDiscountModal]=useState(false)
  return (
    <div className={styles.mainContainer}>
      <ModalCreateEditDiscount isOpen={discountModal} onClose={()=>setDiscountModal(false)}/>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <Sidebar />
        <DiscountListing setDiscountModal={setDiscountModal} />
      </div>
    </div>
  )
}
