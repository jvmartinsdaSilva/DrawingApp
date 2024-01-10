import { useState } from "react"
import styles from "./styles.module.css"
import { ButtonClean } from "../Buttons"

type setNewValuesInfos = ({ color, size }: { color?: string, size?: number }) => void
type showSize = (size: number) => void

interface menu {
    setNewValues: setNewValuesInfos
}

export const MenuBar = ({ setNewValues }: menu) => {
    const [showSize, setShowsize] = useState<Number>(50)

    const defineSize: showSize = (size: number) => {
        setNewValues({ size })
        setShowsize(size)
    }

    return (
        <menu className={styles.menu}>
            <span className={styles.sizeContainer}>
                <input type="range"
                    min={1} max={50} value={String(showSize)}
                    onChange={e => defineSize(Number(e.target.value))}
                />
                <span className={styles.txt}>{String(showSize)}</span>
            </span>
            <ButtonClean />
            <input type="color" onChange={e => setNewValues({ color: e.target.value })} />
        </menu>
    )
}