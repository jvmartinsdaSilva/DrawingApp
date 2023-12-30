import styles from "./styles.module.css"

export const MenuBar = ({setNewValues}: any) => {

    const setNewSize = (value: Number) => setNewValues({size: value})
    const setNewColor = (value: String) => setNewValues({color: value})
    
    return(
        <menu className={styles.menu}>
            <input type="range" onChange={e => setNewSize(Number(e.target.value))} min={1} max={50} />
            <input type="color" onChange={e => setNewColor(e.target.value)} />
        </menu>
    )
}