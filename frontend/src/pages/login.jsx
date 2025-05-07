import React from "react";
import { NavLink } from "react-router";
import LoginForm from "../components/forms/login-form";

function Login() {
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

        <div className="mt-6 grid grid-cols-3 gap-3">
          <button className="bg-zinc-800 p-2 rounded hover:bg-zinc-700 transition-colors">
            {/* Social icon placeholder */}
          </button>
          <button className="bg-zinc-800 p-2 rounded hover:bg-zinc-700 transition-colors">
            {/* Social icon placeholder */}
          </button>
          <button className="bg-zinc-800 p-2 rounded hover:bg-zinc-700 transition-colors">
            {/* Social icon placeholder */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
