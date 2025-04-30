import { Route, Routes } from "react-router"
import Home from "./pages/home"
import QuestListing from "./pages/quest-listing"
import Navbar from "./components/navbar"
import AllParctices from "./pages/parctices"
import Login from "./pages/login"

function App() {
  return (
    <>
      <div className="p-4">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quest-list" element={<QuestListing />} />
          <Route path="/practices" element={<AllParctices />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
