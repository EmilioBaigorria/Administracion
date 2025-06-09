import axios from "axios"
import { getLocalToken } from "../services/tokenService"
import { IRequestItem } from "../types/IRequestItem"

const APIURL=import.meta.env.VITE_APIURL
//Esto esta completo pero no hay un controller en el back aun
const baseURL=`${APIURL}/NONE`



export const getAllRequestItem=async()=>{
    try {
        const response=await axios.get(`${baseURL}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los pedidos item: ",error)
    }
}
export const getRequesItemtById=async(id:string)=>{
    try {
        const response=await axios.get(`${baseURL}/${id}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un pedido item: ",error)
    }
}
export const createRequestItem=async(newRequestItem:IRequestItem)=>{
    try {
        const response=await axios.post(`${baseURL}`,newRequestItem,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un pedido item: ",error)
    }
}
export const updateRequestItem=async(updatedRequestItem:IRequestItem)=>{
    try {
        const response=await axios.put(`${baseURL}/${updatedRequestItem.id}`,updatedRequestItem,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un pedido item: ",error)
    }
}
export const deleteRequestItemById=async(id:string)=>{
    try {
        const response=await axios.delete(`${baseURL}/${id}`,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return {message:"El pedido item fue eliminado correctamente"}
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un pedido item: ",error)
    }
}