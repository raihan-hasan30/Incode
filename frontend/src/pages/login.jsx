import React from "react"
import LoginForm from "../components/loginForm"

function Login() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-zinc-300 text-4xl font-bold">WELCOME BACK</h1>
        <p className="font-medium text-zinc-400">
          Don't have a account yet?{" "}
          <button className="text-yellow-400">sign up</button>
        </p>
      </div>
      <LoginForm />
    </div>
  )
}

export default Login
