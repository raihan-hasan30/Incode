import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import LoginForm from "../components/forms/login-form";
import { useAuth } from "../context/authContext";
import loginAPI from "../repository/login-api";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login: updateAuth } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/quest-list", { replace: true });
    }
  }, [user, navigate]);

  function login(type) {
    const params = {
      email: type === "admin" ? "admin@incode.io" : "user@incode.io",
      password: "admin@incode.io",
    };

    loginAPI(params)
      .then((respose) => {
        setLoading(false);
        updateAuth(respose.user);
        navigate("/quest-list");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }

  return (
    <div className="max-h-screen min-h-screen h-screen overflow-hidden grid place-items-center">
      <div className="min-w-96">
        <div className="flex flex-col items-center">
          <h1 className="text-zinc-300 text-4xl font-semibold tracking-wide">WELCOME BACK</h1>
          <p className=" text-zinc-400 text-sm">
            Don't have a account yet?{" "}
            <NavLink
              to={"/register"}
              className="text-yellow-400 hover:font-medium transition-all underline-offset-2 hover:underline"
            >
              Sign up
            </NavLink>
          </p>
        </div>

        <LoginForm />

        <div className="mt-4 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-zinc-900 px-4 text-sm text-gray-400">OR</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => login("admin")}
            className="bg-zinc-800 p-2 rounded hover:bg-zinc-700 transition-colors text-xs text-white/50"
          >
            Login as Admin
          </button>
          <button
            onClick={() => login("user")}
            className="bg-zinc-800 p-2 rounded hover:bg-zinc-700 transition-colors text-xs text-white/50"
          >
            Login as User
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
