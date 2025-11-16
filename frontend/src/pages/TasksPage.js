import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useQuery } from "@apollo/client/react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { GET_TASKS } from "../graphql/mutations";
import { CircularProgress } from "@mui/material";

export default function TasksPage() {
  const userId = localStorage.getItem("UserId");

  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: { userId },
  });

  const readTasks = async () => {
    try {
      const res = await fetch("http://localhost:4000/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const json = await res.json();

      const utter = new SpeechSynthesisUtterance(json.summary);
      utter.rate = 1;
      utter.pitch = 1;
      window.speechSynthesis.speak(utter);
    } catch (err) {
      console.error("TTS Error:", err);
    }
  };

  const handleAddTask = () => refetch();

  if (loading)
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress color="primary" size={36} />
        <Typography sx={{ opacity: 0.8 }}>Loading your tasks…</Typography>
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 6,
          p: 2,
          maxWidth: 400,
          mx: "auto",
          borderRadius: 3,
          background: "rgba(255, 235, 238, 0.7)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography variant="h6" sx={{ color: "error.main", fontWeight: 700 }}>
          Error loading tasks
        </Typography>
        <Typography sx={{ opacity: 0.8, mt: 1 }}>{error.message}</Typography>
      </Box>
    );

  const tasks = data?.tasks || [];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          width: "90%",
          display: "flex",
          margin: "auto",
          marginLeft: "0px",
          justifyContent: "center",
          px: { xs: 1, sm: 2 }, // Responsive side padding
          mt: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: "1200px",
            borderRadius: 4,
            p: { xs: 2, sm: 3, md: 4 },

            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            color: "white",
            textAlign: "center",

            boxSizing: "border-box",
            overflow: "hidden",

            // Beautiful soft drop-shadow
            boxShadow: "0px 10px 35px rgba(0,0,0,0.12)",
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              letterSpacing: "0.5px",
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
              mb: 1,
            }}
          >
            📌 Your Tasks
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              opacity: 0.95,
              maxWidth: "85%",
              mx: "auto",
              lineHeight: 1.6,
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
            }}
          >
            Manage tasks with <strong>Voice AI</strong>, update instantly, and
            stay productive with a smart assistant by your side.
          </Typography>
        </Paper>
      </Box>

      {/* Task Form */}
      <TaskForm onAdd={handleAddTask} currentTasks={tasks} onRead={readTasks} />

      {/* Task List */}
      <Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2, ml: 1 }}>
          📋 Task List
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            m: 0,
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "flex-start",
            },
            alignItems: "stretch",
          }}
        >
          {tasks.length === 0 ? (
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                opacity: 0.6,
                mt: 4,
              }}
            >
              No tasks yet. Add one using voice or manually ✨
            </Typography>
          ) : (
            tasks.map((task, index) => (
              <Grid
                item
                margin="15px"
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={task.id}
                sx={{
                  display: "flex",
                }}
              >
                <TaskCard
                  task={task}
                  userId={userId}
                  number={index}
                  sx={{ height: "100%" }}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}
