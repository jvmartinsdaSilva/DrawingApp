import { useEffect, useState } from "react"
import Board from "./components/Board"
import { Container } from "./components/Container"
import { MenuBar } from "./components/MenuBar"

interface drawProps {
  color?: String,
  size?: Number
}

const App = () => {
  const [drawOptions, setDrawOptions] = useState<drawProps>({color: "black", size: 22})

  return(
    <Container>
      <Board size={drawOptions.size} color={drawOptions.color}/>
      <MenuBar setNewValues={(e: drawProps) => 
        setDrawOptions({color: e.color || drawOptions.color, size: e.size || drawOptions.size})}
        />
    </Container>
  )
}

export  default App