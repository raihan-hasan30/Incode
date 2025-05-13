import { Route, Routes } from "react-router";
import AdminLayout from "./layouts/admin-layout";
import RootLayout from "./layouts/layout";
import AdminHome from "./pages/admin-dashboard/admin-home";
import AdminLessonList from "./pages/admin-dashboard/admin-lesson";
import AdminQuestList from "./pages/admin-dashboard/admin-quest-list";
import CreateLesson from "./pages/admin-dashboard/create-lesson";
import CreateQuest from "./pages/admin-dashboard/create-quest";
import BattleZone from "./pages/battle";
import Home from "./pages/home";
import Login from "./pages/login";
import AllParctices from "./pages/parctices";
import QuestListing from "./pages/quest-listing";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/quest-list" element={<QuestListing />} />
        <Route path="/practice/:questId" element={<AllParctices />} />
        <Route path="/battle/:questId" element={<BattleZone />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="quest" element={<AdminQuestList />} />
        <Route path="lesson" element={<AdminLessonList />} />
        <Route path="create-quest" element={<CreateQuest />} />
        <Route path=":questId/lesson" element={<CreateLesson />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
