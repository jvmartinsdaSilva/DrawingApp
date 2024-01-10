import React, { createContext, useState } from "react";

type drawInfos = {
    color: string,
    size: number,
    clean: boolean
}

interface BoardProps {
    drawInfos: drawInfos,
    toggleColor: (color: string) => void,
    toggleSize: (size: number) => void,
    toggleClean: (clean: boolean) => void
}

export const BoardContext = createContext<BoardProps>({} as BoardProps)

export const BoardProvider = ({children}: {children: React.ReactNode}) => {
    const [color, setColor] = useState<string>("black")
    const [size , setSize] = useState<number>(22)
    const [clear, setClear] = useState<boolean>(false)

    const toggleColor = (color: string) => {setColor(color)}
    const toggleSize = (size: number) => {setSize(size)}
    const toggleClean = (clear: boolean) => {setClear(clear)}

    return(
        <BoardContext.Provider value={{
            drawInfos: {color, size, clean: clear},
                toggleColor,
                toggleSize,
                toggleClean}}>    
            {children}
        </BoardContext.Provider>
    )
}