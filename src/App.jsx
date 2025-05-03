import { Route, Routes } from "react-router"
import Home from "./pages/home"
import QuestListing from "./pages/quest-listing"
import Navbar from "./components/navbar"
import AllParctices from "./pages/parctices"
import Login from "./pages/login"
import RootLayout from "./layout"
import CreateQuest from "./pages/admin-dashboard/create-quest"

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/quest-list" element={<QuestListing />} />
          <Route path="/practice/:questId" element={<AllParctices />} />
        </Route>
        <Route path="/admin/create-quest" element={<CreateQuest />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
