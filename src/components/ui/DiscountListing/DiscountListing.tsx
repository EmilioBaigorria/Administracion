import { FC, useEffect, useState } from "react"
import { getAllDiscounts } from "../../../http/discountRequest"
import { IDiscount } from "../../../types/IDiscount"
import { Button } from "../Button/Button"
import { DiscountBarCard } from "../DiscountBarCard/DiscountBarCard"
import styles from "./DiscountListing.module.css"
interface IDiscountListing{
  setDiscountModal:Function
  discountModal:boolean
}

export const DiscountListing:FC<IDiscountListing> = ({setDiscountModal,discountModal}) => {
  
    const [discounts,setDiscounts]=useState<IDiscount[]>([])
    const [refresh, setRefresh] = useState<boolean>(false)
    const getDiscounts=async()=>{
        const allDiscounts=await getAllDiscounts()
        setDiscounts(allDiscounts)
    }
    useEffect(()=>{
        getDiscounts()
    },[discountModal, refresh])

  return (
    <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Descuentos</p>
                </div>
                <div>
                    <Button text="Agregar descuento" action={()=>setDiscountModal(true)} styleSet={false} />
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                {discounts.map((el)=>(
                    <DiscountBarCard key={el.id} discount={el} setDiscountModal={setDiscountModal} refresh={refresh} setRefresh={setRefresh}/>
                ))}
            </div>
        </div>
  )
}
