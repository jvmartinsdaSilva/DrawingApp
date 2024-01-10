import Board from "./components/Board"
import { Container } from "./components/Container"
import { MenuBar } from "./components/MenuBar"
import {  BoardProvider } from "./components/Board/BoardContext"

const App = () => {
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