import React, { useState } from "react";
import { useMutation } from "@apollo/client/react/hooks";
import { REGISTER_USER } from "../graphql/mutations";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ variables: { input: formData } });
      const token = response.data.registerUser.token;
      localStorage.setItem("token", token);
      alert("Signup successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
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
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};

export default Signup;
