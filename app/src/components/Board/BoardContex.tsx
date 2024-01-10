import React, { createContext, useRef, useState } from "react";

import Drawing from "./Drawing";

interface DrawMenu {
    canvasRef?: any,
    drawingMenu: any
    // setCanvas: (canvas: HTMLCanvasElement) => void
}

export const BoardContext = createContext<DrawMenu>({
    canvasRef: HTMLCanvasElement,
    drawingMenu: {}
})


export const BoardProvider = ({children}: {children: React.ReactNode}) => {
    const canvasRef = useRef<HTMLCanvasElement>()



    return(
        <BoardContext.Provider value={{canvasRef, drawingMenu: Drawing}}>
            {children}
        </BoardContext.Provider>
    )
}