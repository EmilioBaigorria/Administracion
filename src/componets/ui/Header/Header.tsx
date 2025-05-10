import styles from "./Header.module.css"

export const Header = () => {
  return (
    <div className={styles.mainHeaderContainer}>
        <div>
            <img className={styles.img} src="../../../assets/vetra_logo.svg"/>
        </div>
        <div>
            <p></p>
        </div>
    </div>
  )
}
