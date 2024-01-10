import { useRef, useEffect, useState, useContext } from "react"
import io from "socket.io-client"
import Drawing from "./Drawing"
import { BoardContext } from "./BoardContext"

const Board = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const BoardCtx = useContext(BoardContext)
    const [socket, setSocket] = useState<any>()

    const color: string = BoardCtx.drawInfos.color
    const size: number = BoardCtx.drawInfos.size
    const clean: boolean = BoardCtx.drawInfos.clean
    
    useEffect(() => {
        const newSocket = io("http://localhost:5000")
        setSocket(newSocket)
    }, [])
    
    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!
        const ctx: any = canvas?.getContext('2d')      
        const DrawingMenu = new Drawing(color, size, canvasRef.current, socket)

        if(socket){
            socket.on("canvasImage", (data: any) => {
            const image = new Image()
            image.src = data
            image.onload = () => ctx?.drawImage(image, 0 , 0)
        })
        }

        // if(clean) return DrawingMenu

        canvas.addEventListener('mousedown', e => DrawingMenu.start(e))
        canvas.addEventListener('mousemove', e => DrawingMenu.draw(e))
        canvas.addEventListener('mouseup', () => DrawingMenu.end())
        canvas.addEventListener('mouseout', () => DrawingMenu.end())

        return () => {
            canvas.removeEventListener('mousedown', e => DrawingMenu.start(e))
            canvas.removeEventListener('mousemove', e => DrawingMenu.draw(e))
            canvas.removeEventListener('mouseup', () => DrawingMenu.end())
            canvas.removeEventListener('mouseout', () => DrawingMenu.end())
        }
    }, [color, size, clean, socket])

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={400}
            style={{ background: "white", border: "2px solid #222" }}
        >
        </canvas>
    )
}

export default Board