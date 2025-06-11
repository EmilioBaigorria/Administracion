import { FC, useEffect, useState } from "react"
import { Button } from "../Button/Button"
import styles from "./SizeListing.module.css"
import { ISize } from "../../../types/ISize"
import { getAllSizes } from "../../../http/sizeRequest"
import { SizeBarCard } from "../SizeBarCard/SizeBarCard"
interface ISizeListing {
    setSizeModal:Function
    sizeModal:boolean
}
export const SizeListing:FC<ISizeListing> = ({setSizeModal,sizeModal}) => {
    const [sizes, setsizes] = useState<ISize[]>([])
    const getSizes=async ()=>{
        const sizeData=await getAllSizes()
        setsizes(sizeData)
    }
    useEffect(() => {
        getSizes()
    }, [sizeModal])
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
                    <SizeBarCard key={key} size={el} setSizeModal={setSizeModal}/>
                ))}
            </div>
        </div>
    )
}
