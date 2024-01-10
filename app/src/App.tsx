import { useState } from "react"
import Board from "./components/Board"
import { Container } from "./components/Container"
import { MenuBar } from "./components/MenuBar"
import {  BoardProvider } from "./components/Board/BoardContext"

interface drawProps {
  color?: string,
  size?: number
}

const App = () => {
  const [drawOptions, setDrawOptions] = useState<drawProps>({ color: "black", size: 22 })

  return (
    <Container>
      <BoardProvider>
          <Board />
          <MenuBar />
      </BoardProvider>
    </Container>
  )
}

export default App