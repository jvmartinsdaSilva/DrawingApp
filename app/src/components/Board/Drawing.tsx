import { useRef } from "react"

class Drawing  {
    size?: Number
    color?: String
    canvas: any 
    ctx: any
    isDrawing: boolean = false
    lastPX: number = 0
    lastPY: number = 0

    constructor(color?: String, size?: Number, canvas: any){
        this.size = size
        this.color = color
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
    }

    start = (e: { offsetX: number, offsetY: number }) => {
        this.isDrawing = true;
        [this.lastPX, this.lastPY] = [e.offsetX, e.offsetY];
    };

    draw = (e: { offsetX: number, offsetY: number }) => {
        if(!this.isDrawing) return

        if(this.ctx){
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPX, this.lastPY)
            this.ctx.lineTo(e.offsetX, e.offsetY)
            this.ctx.stroke();
        }

        [this.lastPX, this.lastPY] = [e.offsetX, e.offsetY]

    }

    end = () => this.isDrawing = false

}

export default Drawing