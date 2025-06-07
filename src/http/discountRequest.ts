import axios from "axios"
import { IDiscount } from "../types/IDiscount"
import { getLocalToken } from "../services/tokenService"

const APIURL=import.meta.env.VITE_APIURL
const baseURL=`${APIURL}/descuentos`

export const getAllDiscounts=async()=>{
    try {
        const response=await axios.get(`${baseURL}`,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los descuentos: ",error)
    }
}
export const getDiscountById=async(id:string)=>{
    try {
        const response=await axios.get(`${baseURL}/${id}`,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un descuento: ",error)
    }
}
export const createDiscount=async(newDiscount:IDiscount)=>{
    try {
        const response=await axios.post(`${baseURL}`,newDiscount,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un descuento: ",error)
    }
}
export const updateDiscount=async(updatedDiscount:IDiscount)=>{
    try {
        const response=await axios.put(`${baseURL}/${updatedDiscount.id}`,updatedDiscount,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un descuento: ",error)
    }
}
export const deleteDiscount=async(id:string)=>{
    try {
        const response=await axios.delete(`${baseURL}/${id}`,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return {message:"El talle fue eliminado correctamente"}
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un descuento: ",error)
    }
}