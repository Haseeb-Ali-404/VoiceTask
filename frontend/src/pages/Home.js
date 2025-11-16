import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 4,
        py: 6,
        background: "linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)",
      }}
    >
      {/* CONTAINER */}
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 6,
        }}
      >
        {/* LEFT SIDE CONTENT */}
        <Box sx={{ maxWidth: 550 }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mb: 2,
              lineHeight: 1.2,
              background: "linear-gradient(90deg,#1e3a8a,#6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your Voice.  
            Your Tasks.  
            <span style={{ color: "#4f46e5" }}>Hands-Free.</span>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#4b5563",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            VocaTask helps you manage your daily routine using voice commands.  
            Powered by Gemini AI & GraphQL — it's faster, smarter, and effortless.
          </Typography>

          {/* BUTTONS */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/tasks"
              startIcon={<TaskAltIcon />}
              sx={{
                px: 4,
                py: 1.3,
                fontSize: 17,
                textTransform: "none",
                borderRadius: 2,
                background: "linear-gradient(90deg,#4f46e5,#6366f1)",
                "&:hover": {
                  background: "linear-gradient(90deg,#4338ca,#4f46e5)",
                },
              }}
            >
              View Tasks
            </Button>

            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/tasks"
              startIcon={<MicIcon />}
              sx={{
                px: 4,
                py: 1.3,
                fontSize: 17,
                textTransform: "none",
                borderRadius: 2,
                borderColor: "#6366f1",
                color: "#4f46e5",
                "&:hover": {
                  borderColor: "#4f46e5",
                  backgroundColor: "rgba(99,102,241,0.1)",
                },
              }}
            >
              Try Voice Mode
            </Button>
          </Stack>
        </Box>

        {/* RIGHT SIDE ILLUSTRATION */}
        <Box
          sx={{
            width: { xs: "85%", md: "45%" },
            textAlign: "center",
          }}
        >
          <img
            src="https://img.freepik.com/premium-vector/voice-assistant-concept-artificial-intelligence-wave-microphone-control-sound-recognition_653980-38.jpg"
            alt="Voice AI Illustration"
            style={{
              width: "100%",
              maxWidth: "480px",
              borderRadius: "20px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
