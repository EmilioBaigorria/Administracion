import { FC, useEffect, useState } from 'react'
import styles from "./CategorieListing.module.css"
import { Button } from '../Button/Button'
import { ICategories } from '../../../types/ICategories'
import { CategorieBarCard } from '../CategorieBarCard/CategorieBarCard'
import { getAllCategories } from '../../../http/categorieRequest'


//const initialValues:ICategories[]=[{nombre:"Urbano",id:11},{nombre:"Hombre",id:12}]
interface ICategorieListing{
    setCategorieModal:Function
}
export const CategorieListing:FC<ICategorieListing> = ({setCategorieModal}) => {
    
    const [categories,setCategories]=useState<ICategories[]>([])
    const getCategories=async()=>{
        const allCategories=await getAllCategories()
        setCategories(allCategories)
    }
    useEffect(()=>{
        getCategories()
    },[])

  return (
    <div className={styles.mainContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerContainer_text}>
                    <p>Categorias</p>
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
