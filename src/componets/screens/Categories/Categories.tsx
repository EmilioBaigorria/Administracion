import { useState } from "react"
import { ModalCreateEditeCategorie } from "../../modals/ModalCreateEditeCategorie/ModalCreateEditeCategorie"
import { CategorieListing } from "../../ui/CategorieListing/CategorieListing"
import { Header } from "../../ui/Header/Header"
import { Sidebar } from "../../ui/Sidebar/Sidebar"
import styles from "./Categories.module.css"

export const Categories = () => {
  const [categorieModal,setCategorieModal]=useState(false)
  return (
    <div className={styles.mainContainer}>
      <ModalCreateEditeCategorie isOpen={categorieModal} onClose={setCategorieModal}/>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <Sidebar />
        <CategorieListing setCategorieModal={setCategorieModal} categorieModal={categorieModal}/>
      </div>
    </div>
  )
}
