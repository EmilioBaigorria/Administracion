import styles from "./Login.module.css"
import { Header } from '../../ui/Header/Header'
import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "../../ui/Button/Button"
import { useNavigate } from "react-router"
import { ILoginBody } from "../../../types/ILoginBody"
import { authRequest } from "../../../http/auth/authRequest"
import { tokenIsExpired } from "../../../services/jwtService"


const initialValues = {
  email: "",
  password: ""
}
export const Login = () => {
  const [logInInfo, setLogInInfo] = useState<ILoginBody>(initialValues)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setLogInInfo((prev) => ({ ...prev, [`${name}`]: value }))
  }
  const navigate = useNavigate()
  const handleLogin = async () => {
    console.log(logInInfo)
    const token = await authRequest(logInInfo)
    if (token) {
      console.log("token: ", token)
      localStorage.setItem('token', token)
      navigate("/products")
      return
    }
    setErrorMessage("Contraseña o Email invalidos")
  }


  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token && !tokenIsExpired(token)){
      navigate("/products")
    }else{
      localStorage.clear()
    }
  },[])



  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.logInComponent}>
          <div className={styles.logInComponent_header}>
            Inicio de Sesion
          </div>
          <div className={styles.logInComponent_content}>
            {errorMessage !== "" ? <div className={styles.errorMessage}>{errorMessage}</div> : <div></div>}
            <div className={styles.logInComponent_content_inputs}>
              <div className={styles.inputComponent}>
                <p>Correo</p>
                <input type="text" name="email" onChange={handleChangeInputs} />
              </div>
              <div className={styles.inputComponent}>
                <p>Contraseña</p>
                <input type="password" name="password" onChange={handleChangeInputs} />
              </div>
            </div>
            <div className={styles.logInComponent_content_button}>
              <Button text="Iniciar Sesion" action={handleLogin} styleSet={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
