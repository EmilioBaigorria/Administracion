import axios from "axios"
import { IAdress } from "../types/IAdress"

const APIURL=import.meta.env.VITE_APIURL
const baseURL=`${APIURL}/direcciones`

export const getAllAdresses=async()=>{
    try {
        const response=await axios.get(`${baseURL}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos las direcciones: ",error)
    }
}
export const getAdressById=async(id:string)=>{
    try {
        const response=await axios.get(`${baseURL}/${id}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de una direccion: ",error)
    }
}
export const createAdress=async(newAdress:IAdress)=>{
    try {
        const response=await axios.post(`${baseURL}`,newAdress)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de una direccion: ",error)
    }
}
export const updateAdress=async(updatedAdress:IAdress)=>{
    try {
        const response=await axios.put(`${baseURL}/${updatedAdress.id}`,updatedAdress)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de una direccion: ",error)
    }
}
export const deleteAdressById=async(id:string)=>{
    try {
        const response=await axios.delete(`${baseURL}/${id}`)
        if(response){
            return {message:"La categoria fue eliminada correctamente"}
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de una direccion: ",error)
    }
}