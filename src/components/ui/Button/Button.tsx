import { FC } from "react"
import styles from "./Button.module.css"


interface IButton {
  text?: string
  action: VoidFunction
  icon?: any
  styleSet?: boolean
}
export const Button: FC<IButton> = ({ text, action, icon, styleSet = true }) => {
  const useAction = () => {
    action()
  }
  return (
    <div>
      <button className={styleSet ? styles.button_1 : styles.button_2} onClick={useAction}>{text}{icon}</button>
    </div>
  )
}
