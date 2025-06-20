import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { authRequest } from "../../../http/auth/authRequest"
import { getAllUsers } from "../../../http/userRequest"
import { tokenIsExpired } from "../../../services/jwtService"
import { useUserStore } from "../../../store/userStore"
import { ILoginBody } from "../../../types/ILoginBody"
import { IUser, ROLE } from "../../../types/IUser"
import { Button } from "../../ui/Button/Button"
import styles from "./Login.module.css"


const initialValues = {
  email: "",
  password: ""
}
export const Login = () => {
  const [logInInfo, setLogInInfo] = useState<ILoginBody>(initialValues)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const setActiveUser = useUserStore((state) => state.setActiveUser)
  const deleteUser = useUserStore((state) => state.deleteUser)

  const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setLogInInfo((prev) => ({ ...prev, [`${name}`]: value }))
  }
  const navigate = useNavigate()
  const handleLogin = async () => {
    const token = await authRequest(logInInfo)
    if (token) {
      localStorage.setItem('token', token)
      const userRole = await setLoggedUser(logInInfo.email)
      console.log(userRole)
      if (userRole == "ADMIN") {
        navigate("/products")
      } else {
        localStorage.clear()
        deleteUser()
        setErrorMessage("No estas autorizado")
      }
    }
    setErrorMessage("Contraseña o Email invalidos")
  }

  const setLoggedUser = async (email: string): Promise<string | ROLE> => {
    const users: IUser[] = await getAllUsers();
    const user = users.find(user => user.email === email);

    if (user) {
      localStorage.setItem('userId',user.id!.toString())
      setActiveUser(user);
      return user.rol;
    }

    return "NOT WORKING";
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !tokenIsExpired(token)) {
      navigate("/products")
    } else {
      localStorage.clear()
    }
  }, [])



  return (
    <div className={styles.mainContainer}>
      <img style={{height: "12%", gap: "1rem"}}
        src="https://res.cloudinary.com/danzaburou/image/upload/v1749489285/vetra_banner_wflubd.png"
        alt="Vetra"
      />
      <div className={styles.contentContainer}>
        <div className={styles.logInComponent}>
          <div className={styles.logInComponent_header}>
            ADMINISTRACIÓN - Inicio de Sesión
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
              <Button text="INICIAR SESIÓN" action={handleLogin} styleSet={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
