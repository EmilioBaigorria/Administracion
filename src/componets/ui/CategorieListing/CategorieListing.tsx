import React, { useState } from 'react'
import styles from "./CategorieListing.module.css"
import { Button } from '../Button/Button'

export const CategorieListing = () => {

    const [categories,setCategories]=useState()

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
                
            </div>
        </div>
  )
}
