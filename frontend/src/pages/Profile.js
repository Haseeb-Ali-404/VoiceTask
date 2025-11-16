import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import userData from "../utils/user";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Editable fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const u = userData();

    if (!u) {
      window.location.href = "/login";
      return;
    }

    setUser(u);
    setName(u.userName);
    setEmail(u.email);
  }, []);

  if (!user) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "linear-gradient(135deg, #eef2ff, #ffffff)",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 550,
          borderRadius: 4,
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,0.75)",
          boxShadow: "0 8px 35px rgba(0,0,0,0.12)",
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            borderRadius: 4,
            mb: 2,
            background: "linear-gradient(135deg, #4f46e5, #6366f1, #818cf8)",
            color: "white",
            boxShadow: "0 8px 25px rgba(99,102,241,0.4)",
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              mx: "auto",
              mb: 1,
              border: "3px solid white",
              background:
                "linear-gradient(135deg, #6366f1, #818cf8, #a5b4fc)",
              fontSize: "2.2rem",
              fontWeight: 700,
            }}
          >
            {user.username?.[0]?.toUpperCase()}
          </Avatar>

          <Typography variant="h5" fontWeight={700}>
            {user.username}
          </Typography>

          <Typography sx={{ opacity: 0.8 }}>{user.email}</Typography>
        </Box>

        {/* Info Section */}
        <CardContent>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
            Account Details
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Editable Fields */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Username"
              value={name}
              disabled={!editMode}
              onChange={(e) => setName(e.target.value)}
              sx={{ borderRadius: 2 }}
            />

            <TextField
              label="Email"
              value={email}
              disabled
              sx={{ borderRadius: 2 }}
            />
          </Box>

          {/* Buttons
          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            {!editMode ? (
              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: 1.4,
                  background:
                    "linear-gradient(135deg, #4f46e5, #6366f1, #818cf8)",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                }}
                onClick={() => setEditMode(true)}
              >
                ✏️ Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.4,
                    background:
                      "linear-gradient(135deg, #10b981, #34d399)",
                    boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                  }}
                  onClick={() => {
                    // TODO: API call to update profile
                    setEditMode(false);
                  }}
                >
                  💾 Save
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ py: 1.4 }}
                  onClick={() => {
                    setEditMode(false);
                    setName(user.username);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box> */}

          {/* Logout */}
          <Button
            fullWidth
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, #ef4444, #f87171, #fb923c)",
              color: "white",
              fontWeight: 700,
              boxShadow: "0 4px 14px rgba(239,68,68,0.4)",
              "&:hover": {
                transform: "translateY(-3px)",
              },
            }}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            🔓 Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
