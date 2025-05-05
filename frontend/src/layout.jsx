import { Outlet } from "react-router";

export default function RootLayout(){
    return <main className="max-w-7xl mx-auto p-4">
        <Outlet />
    </main>
}