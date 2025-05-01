
import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setDarkMode(!darkMode)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">Kris Janowski</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/solo-projects" className="hover:underline">Solo Projects</Link>
          <Link to="/collaborations" className="hover:underline">Collaborations</Link>
          <Link to="/studies" className="hover:underline">Studies</Link>
          <button
            onClick={toggleDark}
            className="ml-4 px-2 py-1 border rounded"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
