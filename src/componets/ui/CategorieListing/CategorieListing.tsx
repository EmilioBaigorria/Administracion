import React, { useState } from 'react'
import styles from "./CategorieListing.module.css"
import { Button } from '../Button/Button'
import { Categories } from '../../../types/enums/Categories'

const initialValues:Categories[]=[0,1,2,3,4,5]

export const CategorieListing = () => {
    
    const [categories,setCategories]=useState<Categories[]>(initialValues)

  return (
    <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Productos</p>
                </div>
                <div>
                    <Button text="Agregar Categoria" action={() => { }} styleSet={false} />
                </div>
            </div>
            <div className={styles.productsContainer}>
                {categories.map((el)=>(
                    <p>{Categories[el]}</p>
                ))}
            </div>
        </div>
  )
}
