import { ButtonHTMLAttributes } from "react"
import styles from "./style.module.css"

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonClean = ({...props}: buttonProps) => <button className={styles.btnClean} {...props}></button>