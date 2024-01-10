import { useContext, useState } from "react"
import styles from "./styles.module.css"
import { ButtonClean } from "../Buttons"
import { BoardContext } from "../Board/BoardContext"

type setNewValuesInfos = ({ color, size }: { color?: string, size?: number }) => void
type showSize = (size: number) => void

export const MenuBar = () => {
    const BoardCtx = useContext(BoardContext)
    const [showSize, setShowsize] = useState<Number>(BoardCtx.drawInfos.size)

    const defineSize: showSize = (size: number) => {
        BoardCtx.toggleSize(size)
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
            <ButtonClean onClick={() => BoardCtx.toggleClean(true)}/>
            <input type="color" onChange={e => BoardCtx.toggleColor(e.target.value)} />
        </menu>
    )
}