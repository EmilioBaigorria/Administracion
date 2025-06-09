import axios from "axios"
import { IProduct } from "../types/IProduct"
import { getLocalToken } from "../services/tokenService"

const APIURL=import.meta.env.VITE_APIURL
const baseURL=`${APIURL}/productos`



export const getAllProducts=async()=>{
    try {
        const response=await axios.get(`${baseURL}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los productos: ",error)
    }
}
export const getProductById=async(id:string)=>{
    try {
        const response=await axios.get(`${baseURL}/${id}`)
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de un producto ",error)
    }
}
export const createProduct=async(newProduct:IProduct)=>{
    try {
        const response=await axios.post(`${baseURL}`,newProduct,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un producto: ",error)
    }
}
export const updateProduct=async(updatedProduct:IProduct)=>{
    try {
        const response=await axios.put(`${baseURL}/${updatedProduct.id}`,updatedProduct,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un producto: ",error)
    }
}
export const deleteProductById=async(id:string)=>{
    try {
        const response=await axios.delete(`${baseURL}/${id}`,{headers:{"Authorization":getLocalToken()}})
        if(response){
            return {message:"El producto fue eliminado correctamente"}
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un producto: ",error)
    }
}