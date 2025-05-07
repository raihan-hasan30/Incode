import { Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import RootLayout from "./layout";
import CreateQuest from "./pages/admin-dashboard/create-quest";
import Home from "./pages/home";
import Login from "./pages/login";
import AllParctices from "./pages/parctices";
import QuestListing from "./pages/quest-listing";
import Register from "./pages/register";

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
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
