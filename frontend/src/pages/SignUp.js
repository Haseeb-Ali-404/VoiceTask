import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "../graphql/mutations";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f3f4f6",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={2}
            sx={{ color: "#4f46e5" }}
          >
            Create Account
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            sx={{ color: "#6b7280", mb: 3 }}
          >
            Sign up to continue to VocaTask
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.3,
                background: "linear-gradient(90deg,#4f46e5,#6366f1)",
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: 2,
                mb: 2,
                "&:hover": {
                  background: "linear-gradient(90deg,#4338ca,#4f46e5)",
                },
              }}
            >
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>

          {/* 🔥 Login Redirect Button */}
          <Button
            fullWidth
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              py: 1.2,
              textTransform: "none",
              borderRadius: 2,
              borderColor: "#6366f1",
              color: "#4f46e5",
              "&:hover": {
                borderColor: "#4f46e5",
                backgroundColor: "rgba(99,102,241,0.08)",
              },
            }}
          >
            Already have an account? Login
          </Button>

          {error && (
            <Typography
              color="error"
              textAlign="center"
              mt={2}
              fontSize="0.9rem"
            >
              {error.message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
