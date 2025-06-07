import { IProduct } from "./IProduct";

export interface IDiscount{
    id?:number,
    fechaInicio:Date,
    fechaCierre:Date,
    descuento:number,
    productos:IProduct[]
}