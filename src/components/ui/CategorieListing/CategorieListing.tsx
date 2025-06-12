import { FC, useEffect, useState } from 'react'
import { getAllCategories } from '../../../http/categorieRequest'
import { ICategories } from '../../../types/ICategories'
import { Button } from '../Button/Button'
import { CategorieBarCard } from '../CategorieBarCard/CategorieBarCard'
import styles from "./CategorieListing.module.css"


//const initialValues:ICategories[]=[{nombre:"Urbano",id:11},{nombre:"Hombre",id:12}]
interface ICategorieListing{
    setCategorieModal:Function
    categorieModal:boolean
}
export const CategorieListing:FC<ICategorieListing> = ({setCategorieModal,categorieModal}) => {
    
    const [categories,setCategories]=useState<ICategories[]>([])
    const getCategories=async()=>{
        const allCategories=await getAllCategories()
        setCategories(allCategories)
    }
    useEffect(()=>{
        getCategories()
    },[categorieModal])

  return (
    <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Categorías</p>
                </div>
                <div>
                    <Button text="Agregar Categoría" action={()=>setCategorieModal(true)} styleSet={false} />
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                {categories.map((el)=>(
                    <CategorieBarCard key={el.id} categorie={el} setCategorieModal={setCategorieModal}/>
                ))}
            </div>
        </div>
  )
}
