import { LoaderCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import registerAPI from "../../repository/register-api";

function RegisterForm() {
  const [loading, setLoading] = React.useState(false);
  let navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Check if the email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      setLoading(false);
      alert("Please enter a valid email address");
      return;
    }

    // Check if the first name and last name are valid
    const namePattern = /^[a-zA-Z]+$/;
    if (!namePattern.test(data.firstName) || !namePattern.test(data.lastName)) {
      setLoading(false);
      alert("First name and last name must contain only letters");
      return;
    }
    // Check if the first name and last name are not empty
    if (data.firstName.trim() === "" || data.lastName.trim() === "") {
      setLoading(false);
      alert("First name and last name cannot be empty");
      return;
    }
    // Check if the email is not empty
    if (data.email.trim() === "") {
      setLoading(false);
      alert("Email cannot be empty");
      return;
    }
    // Check if the password is not empty
    if (data.password.trim() === "") {
      setLoading(false);
      alert("Password cannot be empty");
      return;
    }
    // Check if the re-type password is not empty
    if (data["re-password"].trim() === "") {
      setLoading(false);
      alert("Re-type password cannot be empty");
      return;
    }

    // Match for the Password and Re-type Password
    if (data.password !== data["re-password"]) {
      setLoading(false);
      alert("Passwords do not match");
      return;
    }

    const params = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    // Requesting Server to register the user
    registerAPI(params)
      .then((respose) => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }

  return (
    <form autoComplete="off" className="my-6" onSubmit={handleFormSubmit}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex gap-4">
          <input
            className="w-full bg-zinc-800 text-gray-300 p-3 rounded outline-none border-nonetransition-all focus:ring-2 focus:ring-yellow-500"
            name="firstName"
            autoComplete="off"
            placeholder="First Name"
            required
          />
          <input
            className="w-full bg-zinc-800 text-gray-300 p-3 rounded outline-none border-nonetransition-all focus:ring-2 focus:ring-yellow-500"
            name="lastName"
            autoComplete="off"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          className="w-full bg-zinc-800 text-gray-300 p-3 rounded outline-none border-nonetransition-all focus:ring-2 focus:ring-yellow-500"
          name="email"
          autoComplete="off"
          placeholder="Write your e-mail"
          required
        />
        <input
          className="w-full bg-zinc-800 text-gray-300 p-3 rounded outline-none border-none transition-all focus:ring-2 focus:ring-yellow-500"
          name="password"
          autoComplete="off"
          placeholder="Strong Password"
          required
        />

        <input
          className="w-full bg-zinc-800 text-gray-300 p-3 rounded outline-none border-none transition-all focus:ring-2 focus:ring-yellow-500"
          name="re-password"
          autoComplete="off"
          placeholder="Retype Password"
          required
        />

        <button
          className="flex gap-2 items-center justify-center w-full bg-yellow-500 text-black font-medium py-3 rounded hover:bg-yellow-400 transition-all focus:ring-2 focus:ring-yellow-500 border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading && <LoaderCircle color="black" size={18} className="animate-spin transition-all" />}
          Register
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
