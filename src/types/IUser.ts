

export enum Role {
  ADMIN,
  USUARIO,
}

export interface IUser {
  id?: string
  nombre: string
  email: string
  contraseña: string
  rol: string
}
