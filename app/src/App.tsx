import { useEffect, useState } from "react"
import Board from "./components/Board"

const App = () => {
  const [color, setColor] = useState<String>("black")


  return(
    <>
      <Board color={color}/>
      <input type="color" onChange={e => setColor(e.target.value)}/>
    </>
  )
}

export  default App