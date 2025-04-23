export enum enumCategoria{
    URBANAS,
    DEPORTIVAS
}

export interface IProduct{
    id:string,
    nombre:string,
    stock:number,
    precio:number,
    descripcion:string,
    categoria:enumCategoria,
    talle:string,
    color:string[],
    marca:string,
    id_talle_producto:string,
    id_descuento_producto:string
}