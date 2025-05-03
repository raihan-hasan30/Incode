import React from "react"
import { Outlet } from "react-router"

function Navbar() {
  return (
    <>
      <div className="flex justify-between py-4 mb-5">
        <img src="/logo.svg" alt="incode"  className="h-8"/>
        <img src="/avatar.svg" alt="avatar"  className="h-8"/>
      </div>

      <Outlet />
    </>
  )
}

export default Navbar
