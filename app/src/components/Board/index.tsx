import { useRef, useEffect, useState } from "react"

import io from "socket.io-client"

interface drawProps {
    color: String,
    size: Number
}
// const [socket, setSocket] = useState(null);


const Board = ({ color, size }: drawProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log(size, color)
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const startDrawing = (e: { offsetX: number; offsetY: number; }) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const draw = (e: { offsetX: number; offsetY: number; }) => {
            if (!isDrawing) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }

            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const endDrawing = () => {
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL(); // Get the data URL of the canvas content

            isDrawing = false;
        };

        const canvas: HTMLCanvasElement | null = canvasRef.current;
        const ctx = canvasRef.current?.getContext('2d');

        if (ctx) {
            ctx.strokeStyle = color
            ctx.lineWidth = size;

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';


        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mouseout', endDrawing);
        };
    }, [color, size]);

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={400}
            style={{ background: "white", border: "1px solid black" }}
        >
        </canvas>
    )
}

export default Board