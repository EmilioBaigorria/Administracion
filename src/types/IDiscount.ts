import { IProduct } from "./IProduct";

export interface IDiscount{
    id?:string,
    fechaInicio:Date,
    fechaCierre:Date,
    descuento:number,
    productos:IProduct[]
}