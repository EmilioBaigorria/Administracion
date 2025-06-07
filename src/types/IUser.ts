

export enum Role {
  ADMIN,
  USUARIO,
}

export interface IUser {
  id?: number
  nombre: string
  email: string
  contraseña: string
  rol: string
}
