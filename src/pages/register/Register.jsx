import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(inputs);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const posting = await axios.post(
        "http://localhost:8800/api/auth/register",
        inputs
      );

      navigate("/login");
    } catch (error) {
      setErr(error.response.data);
    }
    console.log("error", err);
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>FACE BOOK</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores
            magnam id, laboriosam dolorum nihil odio suscipit tempora pariatur
            ipsam aliquid.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
