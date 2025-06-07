import { IRequestItem } from "./IRequestItem";

export enum STATE{
    PENDIENTE,
    ENPROCESO,
    APROBADO,
    RECHAZADO,
    CANCELADO,
    FALLIDO,
}


export interface IRequest{
    id?:number,
    usuarioId:number,
    items:IRequestItem[],
    estado:STATE,
    fechaCreacion:Date
}