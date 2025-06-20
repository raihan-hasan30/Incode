import { NavLink } from "react-router";
import { useAuth } from "../context/authContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navLinkClass = ({ isActive }) =>
    isActive ? "text-yellow-400 font-bold underline underline-offset-4" : "hover:text-yellow-400 transition-colors";
  return (
    <>
      <div className="flex justify-between py-4 mb-5">
        <NavLink to={"/"} className="flex items-center">
          <img src="/logo.svg" alt="incode" className="h-8" />
        </NavLink>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            {user && user.role === "admin" && (
              <NavLink to={"/admin"} className={navLinkClass}>
                Admin
              </NavLink>
            )}
            <NavLink to={"/quest-list"} className={navLinkClass}>
              Quest List
            </NavLink>
            {!user ? (
              <NavLink to={"/login"} className={navLinkClass}>
                Login
              </NavLink>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="font-medium">{user.firstName}</span>
                <img src={user.profileImage || "/avatar.svg"} alt="avatar" className="h-8 rounded-full border" />
                <button onClick={logout} className="text-xs text-gray-500 hover:underline">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
