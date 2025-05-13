import axios from "axios"
import { ISize } from "../types/ISize"

const APIURL=import.meta.env.VITE_APIURL
const baseURL=`${APIURL}/talles`

export const getAllSizes=async()=>{
    try {
        const response=await axios.get(`${baseURL}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos las talles: ",error)
    }
}
export const getSizeById=async(id:string)=>{
    try {
        const response=await axios.get(`${baseURL}/${id}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de uno de los  talles: ",error)
    }
}
export const createSize=async(size:ISize)=>{
    try {
        const response=await axios.post(`${baseURL}`,size)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un talle: ",error)
    }
}
export const updateSize=async(updatedSize:ISize)=>{
    try {
        const response=await axios.put(`${baseURL}/${updatedSize.id}`,updatedSize)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la actulizacion de un talle: ",error)
    }
}
export const deleteSizeById=async(id:string)=>{
    try {
        const response=await axios.delete(`${baseURL}/${id}`)
        if(response){
            return {message:"El talle fue eliminado correctamente"}
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un talle: ",error)
    }
}