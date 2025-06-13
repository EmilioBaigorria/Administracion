import { FC, useEffect, useState } from "react"
import { getAllSizes } from "../../../http/sizeRequest"
import { ISize } from "../../../types/ISize"
import { Button } from "../Button/Button"
import { SizeBarCard } from "../SizeBarCard/SizeBarCard"
import styles from "./SizeListing.module.css"
interface ISizeListing {
    setSizeModal: Function
    sizeModal: boolean
}
export const SizeListing: FC<ISizeListing> = ({ setSizeModal, sizeModal }) => {
    const [sizes, setsizes] = useState<ISize[]>([])
    const [refresh, setRefresh] = useState<boolean>(false)
    const getSizes = async () => {
        const sizeData = await getAllSizes()
        setsizes(sizeData)
    }
    useEffect(() => {
        getSizes()
    }, [sizeModal, refresh])
    return (
        <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Talles</p>
                </div>
                <div>
                    <Button text="Agregar talle" action={() => setSizeModal(true)} styleSet={false} />
                </div>
            </div>
            <div className={styles.productsContainer}>
                {sizes.map((el, key) => (
                    <SizeBarCard key={key} size={el} setSizeModal={setSizeModal} refresh={refresh} setRefresh={setRefresh} />
                ))}
            </div>
        </div>
    )
}
