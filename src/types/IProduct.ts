import { ICategories } from "./ICategories";


export interface IProduct{
    id:string,
    nombre:string,
    stock:number,
    precio:number,
    descripcion:string,
    categoria:ICategories[],
    talle:string,
    color:string[],
    marca:string,
    id_talle_producto:string,
    id_descuento_producto:string
}