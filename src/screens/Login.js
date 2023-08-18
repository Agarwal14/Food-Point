import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");

    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="container">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-info rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>
          <button type="submit" className="m-3 btn btn-info">
            Submit
          </button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-warning">
            I am a new user
          </Link>
        </form>
      </div>
    </div>
  );
}
