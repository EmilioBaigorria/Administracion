import { IOrderDetail } from "./IOrderDetail";

export interface IBuyOrder{
    id?:number,
    pedidoId:number,
    detalles:IOrderDetail[],
    fechaOrden:Date,
    montoTotal:number,
    medioPago:string
}