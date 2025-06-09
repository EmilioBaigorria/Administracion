import axios from "axios"
import { getLocalToken } from "../services/tokenService"
import { IRequest } from "../types/IRequest"

const APIURL=import.meta.env.VITE_APIURL
const baseURL=`${APIURL}/pedidos`



export const getAllRequests=async()=>{
    try {
        const response=await axios.get(`${baseURL}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los pedidos: ",error)
    }
}
export const getRequestById=async(id:string)=>{
    try {
        const response=await axios.get(`${baseURL}/${id}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un pedido: ",error)
    }
}
export const createRequest=async(newRequest:IRequest)=>{
    try {
        const response=await axios.post(`${baseURL}`,newRequest,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un pedido: ",error)
    }
}
export const updateRequest=async(updatedRequest:IRequest)=>{
    try {
        const response=await axios.put(`${baseURL}/${updatedRequest.id}`,updatedRequest,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un pedido: ",error)
    }
}
export const deleteRequestById=async(id:string)=>{
    try {
        const response=await axios.delete(`${baseURL}/${id}`,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return {message:"El pedido fue eliminado correctamente"}
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un pedido: ",error)
    }
}