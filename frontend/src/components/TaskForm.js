import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { ADD_TASK, DELETE_TASK, UPDATE_TASK } from "../graphql/mutations";
import { DatePicker } from "@mui/x-date-pickers";
import VoiceMode from "./VoiceMode";

export default function TaskForm({ onAdd, currentTasks, onRead }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const [addTask] = useMutation(ADD_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  // ---------------- VOICE PROCESSOR (No UI change) -----------------
  const processVoice = async (speechText) => {
    try {
      const res = await fetch("http://localhost:4000/ai/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: speechText }),
      });

      const data = await res.json();

      const t = data.title || "";
      const d = data.description || "";
      const due = data.due_date ? new Date(data.due_date) : null;

      setTitle(t);
      setDescription(d);
      setDueDate(due);

      const userId = localStorage.getItem("UserId");

      if (data.intent === "add") {
        await addTask({
          variables: {
            userId,
            title: t,
            description: d,
            status: "pending",
            createdDate: new Date().toISOString(),
            dueDate: due?.toISOString(),
          },
        });
        onAdd({ title: t, description: d, dueDate: due });
      }

      if (data.intent === "delete") {
        const n = data.task_number;
        let match =
          n && currentTasks[n - 1]
            ? currentTasks[n - 1]
            : currentTasks.find((task) =>
                task.title.toLowerCase().includes(t.toLowerCase())
              );

        if (!match) return alert("Task not found!");

        await deleteTask({ variables: { userId, taskId: match.id } });
        alert("Task deleted");
        window.location.reload()
      }

      if (data.intent === "update") {
        const match = currentTasks.find((task) =>
          task.title.toLowerCase().includes(t.toLowerCase())
        );

        if (!match) return alert("Task not found!");

        await updateTask({
          variables: {
            userId,
            taskId: match.id,
            status: data.status,
          },
        });

        alert("Task updated");
      }

      if (data.intent === "read") onRead();
    } catch (e) {
      console.error("AI error:", e);
    }
  };

  // ---------------- MANUAL SUBMIT -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    const userId = localStorage.getItem("UserId");

    await addTask({
      variables: {
        userId,
        title,
        description,
        status: "pending",
        createdDate: new Date().toISOString(),
        dueDate: dueDate.toISOString(),
      },
    });

    onAdd({ title, description, dueDate });
  };

  // ---------------- POLISHED UI -----------------

  return (
    <Card
      sx={{
        borderRadius: 4,
        p: { xs: 2, md: 3 },
        mb: 4,
        backdropFilter: "blur(8px)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.75), rgba(245,245,245,0.9))",
        boxShadow: "0px 8px 32px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            textAlign: "center",
            mb: 3,
            background: "linear-gradient(90deg, #4f46e5, #6366f1, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ✨ Add Task (Voice + Manual)
        </Typography>

        {/* SIDE-BY-SIDE LAYOUT */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "center",
          }}
        >
          {/* LEFT PANEL — VOICE MODE */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              textAlign: "center",
              background: "rgba(255,255,255,0.6)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ mb: 2, color: "#6366f1" }}
            >
              🎤 Voice Assistant
            </Typography>

            <VoiceMode onText={processVoice} />

            <Button
              variant="contained"
              onClick={onRead}
              sx={{
                mt: 3,
                px: 4,
                py: 1.4,
                borderRadius: 4,
                fontWeight: 700,
                letterSpacing: "0.5px",

                background:
                  "linear-gradient(135deg, #818cf8, #6366f1, #4f46e5)",
                color: "white",
                boxShadow: "0px 6px 18px rgba(25,118,210,0.45)",
                transition: "0.3s ease",

                "&:hover": {
                  transform: "translateY(-3px)",
                  background:
                    "linear-gradient(135deg, #6366f1, #4f46e5, #818cf8)",
                  boxShadow: "0px 12px 28px rgba(25,118,210,0.55)",
                },

                "&:active": {
                  transform: "translateY(0px) scale(0.97)",
                  boxShadow: "0px 4px 12px rgba(25,118,210,0.35)",
                },

                position: "relative",
                overflow: "hidden",

                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-120%",
                  width: "120%",
                  height: "100%",
                  background:
                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent)",
                  transition: "0.55s",
                },

                "&:hover::before": {
                  left: "120%",
                },
              }}
            >
              🔊 Read My Tasks
            </Button>
          </Box>

          {/* RIGHT PANEL — MANUAL ENTRY */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              background: "rgba(255,255,255,0.6)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ mb: 2, color: "text.primary" }}
            >
              ✍️ Manual Task Entry
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                }}
              />

              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                minRows={2}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                }}
              />

              <DatePicker
                label="Due Date"
                value={dueDate}
                onChange={(v) => setDueDate(v)}
                sx={{ mb: 2, width: "100%" }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.4,
                  borderRadius: 3,
                  fontSize: "1rem",
                  fontWeight: 600,
                  mt: 1,
                  background: "linear-gradient(90deg, #818cf8, #4f46e5)",
                  boxShadow: "0px 4px 12px rgba(25,118,210,0.3)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #4f46e5, #818cf8)",
                  },
                }}
              >
                ➕ Add Task
              </Button>
            </form>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
