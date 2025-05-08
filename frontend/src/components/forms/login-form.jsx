import React from "react";

function LoginForm() {
  return (
    <form autoComplete="off" className="my-6">
      <div className="flex flex-col items-center space-y-4">
        <input
          className="w-full bg-zinc-800 text-gray-300 p-3 rounded outline-none border-nonetransition-all focus:ring-2 focus:ring-yellow-500"
          name="email"
          autoComplete="off"
          placeholder="Write your e-mail"
        />
        <input
          className="w-full bg-zinc-800 text-gray-300 p-3 rounded outline-none border-none transition-all focus:ring-2 focus:ring-yellow-500"
          name="password"
          autoComplete="off"
          placeholder="write your password"
        />

        <button
          className="w-full bg-yellow-500 text-black font-medium py-3 rounded hover:bg-yellow-400 transition-all focus:ring-2 focus:ring-yellow-500"
          type="submit"
        >
          {" "}
          Log In
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
