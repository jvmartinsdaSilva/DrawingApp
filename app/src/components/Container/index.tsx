import styles from "./style.module.css"


export const Container = ({children}: any) => {
    return(
        <div className={styles.container}>
            {children}
        </div>
    )

}