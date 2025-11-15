import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy groceries", description: "Milk, Bread, Eggs", status: "pending", due_date:'08-11-2025'},
    { id: 2, title: "Finish project report", description: "Due tomorrow", status: "in progress", due_date:'08-11-2025' },
  ]);

  const handleAddTask = (task) => setTasks([...tasks, { ...task, id: tasks.length + 1 }]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Tasks
      </Typography>
      <TaskForm onAdd={handleAddTask} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
