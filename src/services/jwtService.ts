import { jwtDecode, JwtPayload } from "jwt-decode"

export const tokenIsExpired = (token: string) => {
    try {
        const decodedToken = jwtDecode<JwtPayload>(token)
        if (decodedToken.exp) return decodedToken.exp < Date.now() / 1000
        throw new Error("La fecha de expiracion del token no existe")
    } catch (error) {
        console.log("Ocurrio un error durante la validacion de token: ", error)
        return true
    }
}