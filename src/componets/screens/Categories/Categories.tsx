import { CategorieListing } from "../../ui/CategorieListing/CategorieListing"
import { Header } from "../../ui/Header/Header"
import { Sidebar } from "../../ui/Sidebar/Sidebar"
import styles from "./Categories.module.css"

export const Categories = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <Sidebar />
        <CategorieListing/>
      </div>
    </div>
  )
}
