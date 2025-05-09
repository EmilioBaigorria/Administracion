import { FC } from "react"
import { ICategories } from "../../../types/ICategories"
import { Button } from "../Button/Button"
import styles from "./CategorieBarCard.module.css"
interface ICategorieBarCard {
    categorie: ICategories
}
export const CategorieBarCard: FC<ICategorieBarCard> = ({ categorie }) => {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoContainer}>
                <p>Nombre:{categorie.nombre}</p>
            </div>
            <div className={styles.buttonsContainer}>
                <Button icon={
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                } action={() => { }} />
                <Button icon={
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                } action={() => { }} />
            </div>
        </div>
    )
}
