import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { API } from "../utils/axios";

function Register() {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await API.post("/auth/register", inputs);
      setLoading(false);
      setInputs({
        name: "",
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      setErr(error?.response?.data);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center overflow-y-scroll"
      style={{ background: "rgb(193, 190, 255)" }}
    >
      <div className="flex lg:w-1/2 sm:w-[80%] w-full bg-white min-h-[400px] shadow-md sm:h-max h-full overflow-y-scroll sm:flex-row flex-col-reverse">
        <div className="flex-1 py-6 px-4">
          <div className="flex h-full flex-col gap-3 justify-center">
            <div className="flex flex-col">
              <h1 className="text-[#333] font-medium text-lg">
                Create an account
              </h1>
              <span className="text-[15px] text-slate-500">
                to gain access to dodosocial.
              </span>
            </div>
            {err && (
              <span className="text-sm text-red-500 font-medium">{err}</span>
            )}
            <form
              className="flex flex-col gap-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="text"
                placeholder="Full Name"
                className="text-[15px] px-3 h-12 border border-gray-200 w-full shadow-sm rounded-md outline-none"
                required
                name="name"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Username"
                className="text-[15px] px-3 h-12 border border-gray-200 w-full shadow-sm rounded-md outline-none"
                required
                name="username"
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="text-[15px] px-3 h-12 border border-gray-200 w-full shadow-sm rounded-md outline-none"
                required
                name="email"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="text-[15px] px-3 h-12 border border-gray-200 w-full shadow-sm rounded-md outline-none"
                required
                name="password"
                onChange={handleChange}
              />

              <button
                className={`bg-primary h-11 flex items-center justify-center ${
                  loading ? "text-gray-500" : "text-white"
                } font-medium rounded-md w-full`}
                disabled={loading}
                type="submit"
              >
                {loading ? "Submitting" : "Sign up"}
              </button>
            </form>
          </div>
        </div>
        <div className="flex-1 py-6 px-4 card2">
          <div className="flex flex-col h-full justify-center gap-4 text-white">
            <h1 className="text-6xl leading-tight font-semibold">
              dodosocial.
            </h1>
            <p className="text-[15px] leading-7">
              Welcome to dodosocial! Get ready to connect and share your
              stories. Join the community by logging in or signing up to start
              your social media journey today!
            </p>
            <span className="text-[15px]">Already have an account ?</span>
            <Link to="/login" className="w-full">
              <button className="bg-white h-11 flex items-center justify-center text-base text-primary font-medium rounded-md w-full">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
