import { FC, useEffect, useState } from "react"
import { Button } from "../Button/Button"
import styles from "./DiscountListing.module.css"
import { IDiscount } from "../../../types/IDiscount"
import { getAllDiscounts } from "../../../http/discountRequest"
import { DiscountBarCard } from "../DiscountBarCard/DiscountBarCard"
interface IDiscountListing{
  setDiscountModal:Function
}

export const DiscountListing:FC<IDiscountListing> = ({setDiscountModal}) => {
  
    const [discounts,setDiscounts]=useState<IDiscount[]>([])
    const getDiscounts=async()=>{
        const allDiscounts=await getAllDiscounts()
        setDiscounts(allDiscounts)
    }
    useEffect(()=>{
        getDiscounts()
    },[])

  return (
    <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Productos</p>
                </div>
                <div>
                    <Button text="Agregar Descuento" action={()=>setDiscountModal(true)} styleSet={false} />
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                {discounts.map((el)=>(
                    <DiscountBarCard key={el.id} discount={el}/>
                ))}
            </div>
        </div>
  )
}
