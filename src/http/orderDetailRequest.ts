import axios from "axios"
import { getLocalToken } from "../services/tokenService"
import { IOrderDetail } from "../types/IOrderDetail"

const APIURL=import.meta.env.VITE_APIURL
//Esto esta completo pero no hay un controller en el back aun
const baseURL=`${APIURL}/NONE`



export const getAllOrderDetail=async()=>{
    try {
        const response=await axios.get(`${baseURL}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los detalles de orden: ",error)
    }
}
export const getOrderDetailById=async(id:string)=>{
    try {
        const response=await axios.get(`${baseURL}/${id}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un detalle de orden",error)
    }
}
export const createOrderDetail=async(newOrderDetail:IOrderDetail)=>{
    try {
        const response=await axios.post(`${baseURL}`,newOrderDetail,{headers:{"Authorization":`Bearer ${getLocalToken()}`}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un detalle de orden: ",error)
    }
}
export const updateOrderDetail=async(updatedOrderDetail:IOrderDetail)=>{
    try {
        const response=await axios.put(`${baseURL}/${updatedOrderDetail.id}`,updatedOrderDetail,{headers:{"Authorization":`Bearer ${getLocalToken()}`}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un detalle de orden: ",error)
    }
}
export const deleteOrderDetailById=async(id:string)=>{
    try {
        const response=await axios.delete(`${baseURL}/${id}`,{headers:{"Authorization":`Bearer ${getLocalToken()}`}})
        if(response){
            return {message:"El producto fue eliminado correctamente"}
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un detalle de orden: ",error)
    }
}