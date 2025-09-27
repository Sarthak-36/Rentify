import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
const API_URL = import.meta.env.VITE_URL;


const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isPasswordValid = () => {
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[^A-Za-z0-9]/;

    return (
      password.length >= 8 &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password) &&
      digitRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        API_URL + "/auth/register",
        { firstName, lastName, phone, email, password }
      );
      if (response.status === 200) {
        toast.success("User Regestered Successfully");
        navigate("/login");
      }
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      console.log("Registration failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="register bg-cover bg-center h-screen flex justify-center items-center"
      style={{ backgroundImage: "url('/assets/lux_cat.jpg')" }}
    >
      <div className=" flex  flex-col gap-4 w-80 md:w-96 lg:w-5/12 xl:w-3/12 p-10 bg-black bg-opacity-80 rounded-xl">
        <form
          className="register_content_form flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="First Name"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="px-4 py-2 bg-transparent border-b border-white outline-none text-white"
          />
          <input
            placeholder="Last Name"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
            required
            className="px-4 py-2 bg-transparent border-b border-white outline-none text-white"
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 bg-transparent border-b border-white outline-none text-white"
          />
          <input
            placeholder="Mobile No"
            name="phone"
            type="tel"
            onChange={(e) => {
              const phone = e.target.value;
              setPhone(phone);

              if (phone.length !== 10 || isNaN(phone)) {
                setError("Please enter a valid 10-digit phone number.");
              } else {
                setError(null);
              }
            }}
            required
            className="px-4 py-2 bg-transparent border-b border-white outline-none text-white"
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          
          <input
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="px-4 py-2 bg-transparent border-b border-white outline-none text-white"
          />
          <div
            className={`mt-1 text-sm ${
              isPasswordValid() ? "text-green-500" : "text-red-500"
            } sm:col-span-2 lg:col-span-1`}
          >
            • Password should contain at least 8 characters, including one
            uppercase letter, one lowercase letter, one digit, and one special
            character
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? <PulseLoader color="#fff" size={8} /> : " REGISTER"}
          </button>
        </form>
        <a
          href="/login"
          className="text-white text-sm mt-2 text-center hover:underline"
        >
          Already have an account? Log In Here
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
