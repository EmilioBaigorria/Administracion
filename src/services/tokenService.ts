import { authRequest } from "../http/auth/authRequest"
import { getAllUsers } from "../http/userRequest"
import { useUserStore } from "../store/userStore"
import { ILoginBody } from "../types/ILoginBody"
import { IUser } from "../types/IUser"
import { tokenIsExpired } from "./jwtService"

const AD=import.meta.env.VITE_AD
const ADPS=import.meta.env.VITE_ADPS

export const getLocalToken=()=>{
    return localStorage.getItem('token')
}

export const refreshToken=async()=>{
    const token=localStorage.getItem('token')
    if(token && !tokenIsExpired(token)){
        const log:ILoginBody={
            email:AD,
            password:ADPS
        }
        const newToken=await authRequest(log)
        localStorage.setItem('token',newToken)
    }
}