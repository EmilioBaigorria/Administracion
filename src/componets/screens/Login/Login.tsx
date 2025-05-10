import styles from "./Login.module.css"
import { Header } from '../../ui/Header/Header'
import { ChangeEvent, useState } from "react"
import { Button } from "../../ui/Button/Button"
import { useNavigate } from "react-router"


const initialValues = {
  nombre: "",
  email: "",
  contraseña: ""
}
export const Login = () => {
  const [logInInfo, setLogInInfo] = useState(initialValues)

  const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setLogInInfo((prev) => ({ ...prev, [`${name}`]: value }))
  }
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate("/")
  }
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
            <div className={styles.logInComponent_content_inputs}>
              <div className={styles.inputComponent}>
                <p>Nombre</p>
                <input type="text" name="nombre" onChange={handleChangeInputs} />
              </div>
              <div className={styles.inputComponent}>
                <p>Correo</p>
                <input type="text" name="email" onChange={handleChangeInputs} />
              </div>
              <div className={styles.inputComponent}>
                <p>Contraseña</p>
                <input type="password" name="contraseña" onChange={handleChangeInputs} />
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
