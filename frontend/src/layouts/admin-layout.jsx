import { Outlet } from "react-router";
import AdminSidebar from "../components/admin/admin-sidebar";
import AdminRoute from "../components/AdminRoute";

export default function AdminLayout() {
  return (
    <AdminRoute>
      <AdminSidebar />
      <main className="max-w-7xl mx-auto p-8 ml-20 md:ml-64 h-screen min-h-screen ">
        <Outlet />
      </main>
    </AdminRoute>
  );
}
