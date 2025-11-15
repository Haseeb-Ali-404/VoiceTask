import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to <strong>VocaTask</strong> 🎙️
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Manage your tasks hands-free using voice commands.
      </Typography>
      <Button variant="contained" component={Link} to="/tasks" sx={{ mr: 2 }}>
        View Tasks
      </Button>
      <Button variant="outlined" component={Link} to="/voice">
        Try Voice Mode
      </Button>
    </Box>
  );
}
