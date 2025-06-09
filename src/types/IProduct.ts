import { ICategories } from "./ICategories";
import { IDiscount } from "./IDiscount";
import { ISize } from "./ISize";


export interface IProduct{
    id?:number,
    nombre:string,
    descripcion:string,
    precio:number,
    stock:number,
    categorias:ICategories[],
    color:string,
    marca:string,
    imagen:string,
    descuento:IDiscount | null
    talles:ISize[],
}