import axios from "axios"
import { ILoginBody } from "../../types/ILoginBody"

const APIURL=import.meta.env.VITE_APIURL
const baseURL=`${APIURL}/auth`

export const authRequest=async(logData:ILoginBody)=>{
    try {
        const response=await axios.post(`${baseURL}/authenticate`,logData)
        if(response){
            return response.data.token
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante la autorizacion: ",error)
    }
}