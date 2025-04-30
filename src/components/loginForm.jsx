import React from "react"

function LoginForm() {
  return (
    <>
      <div>
        <form>
          <div className="flex flex-col items-center">
            <input
              className="w-96 bg-zinc-800 text-gray-300 px-10 py-3 rounded"
              type="email"
              name="email"
              placeholder="write your e-mail"
            />
            <input
              className="w-96 bg-zinc-800 text-gray-300 px-10 py-3 rounded"
              type="password"
              name="password"
              placeholder="write your password"
            />
          </div>
        </form>
        <div className=" flex items-center justify-center">
          <button
            className="w-96 bg-yellow-500 text-black font-medium py-3 rounded hover:bg-yellow-400"
            type="submit"
          >
            {" "}
            Log In
          </button>
        </div>
        <div className="mt-6 text-center">
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
    </>
  )
}

export default LoginForm
