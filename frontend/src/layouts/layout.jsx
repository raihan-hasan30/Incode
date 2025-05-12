import { Outlet } from "react-router";
import Navbar from "../components/navbar";

export default function RootLayout() {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <Navbar />
      <Outlet />
    </main>
  );
}
