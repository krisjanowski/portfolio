import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import SoloProjects from "./pages/SoloProjects"
import Collaborations from "./pages/Collaborations"
import Studies from "./pages/Studies"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solo-projects" element={<SoloProjects />} />
            <Route path="/collaborations" element={<Collaborations />} />
            <Route path="/studies" element={<Studies />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
