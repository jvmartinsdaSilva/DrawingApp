import { useRef, useEffect, useState } from "react"
import io from "socket.io-client"
import Drawing from "./Drawing"

interface drawProps {
    color?: String,
    size?: Number
}


const Board = ({ color, size }: drawProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [socket, setSocket] = useState<any>()


    useEffect(() => {
        const newSocket = io("http://localhost:5000")
        setSocket(newSocket)
    }, [])

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef?.current
        const ctx: any = canvas?.getContext('2d')


        if(socket){
            socket.on("canvasImage", (data: any) => {
            const image = new Image()
            image.src = data
            image.onload = () => ctx?.drawImage(image, 0 , 0)
            console.log(data)
        })
        }

        const DrawingMenu = new Drawing(color, size, canvasRef.current, socket)

        const canvasImg = canvasRef.current


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
    }, [color, size, socket])

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