import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client/react";
import { DELETE_TASK, GET_TASKS } from "../graphql/mutations";

export default function TaskCard({ task, userId, number }) {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { userId } }],
  });

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );
    if (!confirmDelete) return;

    try {
      await deleteTask({
        variables: { userId, taskId: task.id },
      });
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 2.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        background: "linear-gradient(145deg, #ffffff, #f4f4ff)",
        border: "1px solid rgba(99,102,241,0.15)",

        transition: "0.35s ease",
        boxShadow:
          "0 4px 14px rgba(0,0,0,0.06), inset 0 0 0 rgba(99,102,241,0)",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            "0 10px 28px rgba(0,0,0,0.12), inset 0 0 18px rgba(99,102,241,0.15)",
          borderColor: "rgba(99,102,241,0.35)",
        },
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        {/* Top Accent Bar */}
        <Box
          sx={{
            height: 4,
            borderRadius: 2,
            mb: 1.5,
            background: "linear-gradient(90deg, #4f46e5, #6366f1, #818cf8)",
          }}
        />

        {/* Task Number */}
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: "#4f46e5",
            letterSpacing: 0.5,
            fontSize: "0.75rem",
          }}
        >
          Task #{number + 1}
        </Typography>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            mb: 1,
            lineHeight: 1.3,
            color: "#1e1b4b",
          }}
        >
          {task.title}
        </Typography>

        {/* Description */}
        {task.description && (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: 2,
              lineHeight: 1.5,
              opacity: 0.95,
            }}
          >
            {task.description}
          </Typography>
        )}

        {/* Status + Date */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={task.status}
            size="small"
            sx={{
              fontWeight: 600,
              textTransform: "capitalize",
              backgroundColor:
                task.status === "completed"
                  ? "#d1fae5"
                  : task.status === "in progress"
                  ? "#fff7d6"
                  : "#e0e7ff",
              color:
                task.status === "completed"
                  ? "#065f46"
                  : task.status === "in progress"
                  ? "#92400e"
                  : "#3730a3",
            }}
          />

          <Chip
            label={`Due: ${task.dueDate}`}
            size="small"
            sx={{
              bgcolor: "#eef2ff",
              color: "#4f46e5",
              fontWeight: 600,
            }}
          />
        </Stack>
      </CardContent>

      {/* Delete Button */}
      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{
            textTransform: "none",
            borderRadius: 3,
            px: 2.5,
            py: 1,
            fontWeight: 700,
            background: "linear-gradient(90deg, #ef4444, #dc2626)",
            boxShadow: "0px 4px 16px rgba(239,68,68,0.35)",

            "&:hover": {
              background: "linear-gradient(90deg, #dc2626, #b91c1c)",
              boxShadow: "0px 6px 22px rgba(239,68,68,0.45)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
}
