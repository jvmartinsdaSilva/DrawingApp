import styles from "./style.module.css"


export const Container = ({children}: {children: React.ReactNode}) => {
    return(
        <div className={styles.container}>
            {children}
        </div>
    )

}