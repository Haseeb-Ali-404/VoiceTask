import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";

export default function TaskCard({ task }) {
  return (
    <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {task.description}
        </Typography>
        <Chip
          label={task.status}
          color={task.status === "completed" ? "success" : "warning"}
          size="small"
        />
      </CardContent>
    </Card>
  );
}
