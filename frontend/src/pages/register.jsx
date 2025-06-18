import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import RegisterForm from "../components/forms/register-form";
import { useAuth } from "../context/authContext";

function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/quest-list", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="max-h-screen min-h-screen h-screen overflow-hidden grid place-items-center">
      <div className="min-w-96">
        <div className="flex flex-col items-center">
          <h1 className="text-zinc-300 text-4xl font-semibold tracking-wide">WELCOME BACK</h1>
          <p className=" text-zinc-400 text-sm">
            Already have an Account?{" "}
            <NavLink
              to={"/register"}
              className="text-yellow-400 hover:font-medium transition-all underline-offset-2 hover:underline"
            >
              Login
            </NavLink>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
