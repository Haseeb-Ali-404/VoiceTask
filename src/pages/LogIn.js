import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ variables: { input: formData } });
      const token = response.data.loginUser.token;
      localStorage.setItem("token", token);
      alert("Login successful!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};

export default Login;
