import React, { useRef, useEffect, useState } from "react"
import io from "socket.io-client"

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

        if(socket){
            socket.on("canvasImage", (data: any) => {
            const image = new Image()
            image.src = data
            const canvas = canvasRef.current
            const ctx = canvas?.getContext("2d")
            image.onload = () => ctx?.drawImage(image, 0 , 0)
        })
        }

        let isDrawing = false
        let lastX = 0
        let lastY = 0

        const startDrawing = (e: { offsetX: number, offsetY: number }) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const draw = (e: { offsetX: number, offsetY: number }) => {
            if (!isDrawing) return

            const canvasImg = canvasRef.current
            const dataURL  = canvasImg?.toDataURL()
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')


            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY)
                ctx.lineTo(e.offsetX, e.offsetY)
                ctx.stroke();
            }

            [lastX, lastY] = [e.offsetX, e.offsetY]
            if(socket){
                socket.emit("canvasImage", dataURL)
            }

        };

        const endDrawing = () => isDrawing = false


        const canvas: HTMLCanvasElement = canvasRef.current
        const ctx = canvasRef.current?.getContext('2d')

        if (ctx) {
            ctx.strokeStyle = color
            ctx.lineWidth = size

            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'

        }

        canvas.addEventListener('mousedown', startDrawing)
        canvas.addEventListener('mousemove', draw)
        canvas.addEventListener('mouseup', endDrawing)
        canvas.addEventListener('mouseout', endDrawing)

        return () => {
            canvas.removeEventListener('mousedown', startDrawing)
            canvas.removeEventListener('mousemove', draw)
            canvas.removeEventListener('mouseup', endDrawing)
            canvas.removeEventListener('mouseout', endDrawing)
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