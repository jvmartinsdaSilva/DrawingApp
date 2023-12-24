import { useRef, useEffect, useState } from "react"

import io from "socket.io-client"

interface options {
    color: String
}
const [socket, setSocket] = useState(null);

useEffect(() => {
    const newSocket = io("http://localhost:5000")
    console.log(newSocket, 'Connected')
    setSocket(newSocket)
}, [])

const Board = ({color}: options) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {


        // Variables to store drawing state
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;


        const startDrawing = (e: { offsetX: number; offsetY: number; }) => {
            isDrawing = true;


            [lastX, lastY] = [e.offsetX, e.offsetY];
        };


        // Function to draw
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


        // Function to end drawing
        const endDrawing = () => {
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL(); // Get the data URL of the canvas content


            // Send the dataURL or image data to the socket
            // console.log('drawing ended')
            if (socket) {
                socket.emit('canvasImage', dataURL);
                console.log('drawing ended')
            }
            isDrawing = false;
        };

        const canvas: HTMLCanvasElement | null = canvasRef.current;
        const ctx = canvasRef.current?.getContext('2d');


        // Set initial drawing styles
        if (ctx) {
            ctx.strokeStyle = color
            ctx.lineWidth = 5;


            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';


        }
        // Event listeners for drawing
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);


        return () => {
            // Clean up event listeners when component unmounts
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mouseout', endDrawing);
        };
    }, [color]);

    return(
        <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{background: "white", border: "1px solid red"}}
        >

        </canvas>
    )
}

export default Board