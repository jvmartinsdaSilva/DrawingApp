import { useState } from "react"
import Board from "./components/Board"
import { Container } from "./components/Container"
import { MenuBar } from "./components/MenuBar"
import { BoardContext } from "./components/Board/BoardContext"

interface drawProps {
  color?: string,
  size?: number
}

const App = () => {
  const [drawOptions, setDrawOptions] = useState<drawProps>({ color: "black", size: 22 })

  return (
    <Container>
      <BoardContext>
        <Board size={drawOptions.size} color={drawOptions.color} />
        <MenuBar setNewValues={(e: drawProps) =>
          setDrawOptions({ color: e.color || drawOptions.color, size: e.size || drawOptions.size })} />
      </BoardContext>
    </Container>
  )
}

export default App