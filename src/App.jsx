import Notes from "./components/Notes"
import ContextProvider from "./context/ContextProvider"


function App() {

  return (
    <>
      <ContextProvider>
        <Notes />
      </ContextProvider>
    </>
  )
}

export default App
