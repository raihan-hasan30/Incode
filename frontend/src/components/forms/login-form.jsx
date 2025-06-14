import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";
import loginAPI from "../../repository/login-api";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      setLoading(false);
      alert("Please enter a valid email address");
      return;
    }

    if (data.password.trim() === "") {
      setLoading(false);
      alert("Password cannot be empty");
      return;
    }

    const params = {
      email: data.email,
      password: data.password,
    };

    loginAPI(params)
      .then((respose) => {
        setLoading(false);
        login(respose.user); // update context for navbar
        navigate("/quest-list");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }

  return (
    <form autoComplete="off" className="my-6" onSubmit={handleSubmit}>
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
