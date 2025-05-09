import React, { FC, useState } from 'react'
import styles from "./CategorieListing.module.css"
import { Button } from '../Button/Button'
import { ICategories } from '../../../types/ICategories'
import { CategorieBarCard } from '../CategorieBarCard/CategorieBarCard'


const initialValues:ICategories[]=[{nombre:"Urbano",id:"11"},{nombre:"Hombre",id:"12"}]
interface ICategorieListing{
    setCategorieModal:Function
}
export const CategorieListing:FC<ICategorieListing> = ({setCategorieModal}) => {
    
    const [categories,setCategories]=useState<ICategories[]>(initialValues)

  return (
    <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Productos</p>
                </div>
                <div>
                    <Button text="Agregar Categoria" action={()=>setCategorieModal(true)} styleSet={false} />
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                {categories.map((el)=>(
                    <CategorieBarCard key={el.id} categorie={el}/>
                ))}
            </div>
        </div>
  )
}
