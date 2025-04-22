import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-800">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App