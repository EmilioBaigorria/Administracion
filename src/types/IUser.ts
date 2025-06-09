import { IAdress } from "./IAdress"


export enum ROLE {
  ADMIN,
  USUARIO,
}

export interface IUser {
  id?: number
  nombre: string
  apellido:string 
  email: string
  password: string
  rol: ROLE | string
  direcciones:IAdress[]
}
