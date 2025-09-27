import  { useState } from "react";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const isPasswordValid = () => {
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[$1%*76]/;

    return (
      password.length >= 8 &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password) &&
      digitRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(import.meta.env.VITE_URL +"/auth/login", {
        email,
        password
      });

      const loggedIn = await response.data

      if (loggedIn) {
        dispatch (
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }
      setLoading(false)
    } catch (err) {
      toast.error("Wrong Email or Password ", err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="register bg-cover bg-center h-screen flex justify-center items-center" style={{backgroundImage: "url('/assets/login.jpg')"}}>
    <div className=" flex  flex-col gap-4 w-80 md:w-96 lg:w-5/12 xl:w-3/12 p-10 bg-black bg-opacity-80 rounded-xl">
      <form className="register_content_form flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 bg-transparent border-b border-white outline-none text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 bg-transparent border-b border-white outline-none text-white"
        />
         <div
            className={`mt-1 text-sm ${isPasswordValid() ? "text-green-500" : "text-red-500"} sm:col-span-2 lg:col-span-1`}
          >
            • Password should contain at least 8 characters, including one
            uppercase letter, one lowercase letter, one digit, and one special
            character ($1%*76)
          </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            {loading ? <PulseLoader color="#fff" size={8} /> : "LOG IN"}
        </button>
        <a href="/register" className="text-white text-lg font-semibold mt-4 hover:underline">
        Don&apos;t have an account? Sign In Here
      </a>

      </form>
      </div>
      </div>

  
  );
};

export default LoginPage;
