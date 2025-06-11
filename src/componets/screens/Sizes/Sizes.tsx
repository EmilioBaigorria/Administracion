import { useState } from "react"
import { Header } from "../../ui/Header/Header"
import { Sidebar } from "../../ui/Sidebar/Sidebar"
import styles from "./Sizes.module.css"
import { SizeListing } from "../../ui/SizeListing/SizeListing"
import { ModalCreateEditSize } from "../../modals/ModalCreateEditSize/ModalCreateEditSize"

export const Sizes = () => {
  const [sizeModal,setSizeModal]=useState(false)
  return (
    <div className={styles.mainContainer}>
      <ModalCreateEditSize isOpen={sizeModal} onClose={()=>setSizeModal(false)}/>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <Sidebar />
        <SizeListing setSizeModal={setSizeModal}/>
      </div>
    </div>
  )
}
