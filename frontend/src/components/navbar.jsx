import { NavLink } from "react-router";

function Navbar() {
  return (
    <>
      <div className="flex justify-between py-4 mb-5">
        <NavLink to={"/"} className="flex items-center">
          <img src="/logo.svg" alt="incode" className="h-8" />
        </NavLink>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <NavLink to={"/quest-list"}>Quest List</NavLink>
            <NavLink to={"/admin/create-quest"}>Quest Create</NavLink>
            <NavLink to={"/login"}>Login</NavLink>
          </div>
          <img src="/avatar.svg" alt="avatar" className="h-8" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
