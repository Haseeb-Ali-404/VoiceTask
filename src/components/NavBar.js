import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <Typography
        variant="h6"
        sx={{ m: 2, fontWeight: "bold", textAlign: "center" }}
      >
        VocaTask
      </Typography>
      <Divider />
      <List>
        {[
          { text: "Home", path: "/" },
          { text: "Tasks", path: "/tasks" },
          { text: "Voice Mode", path: "/voice" },
        ].map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/login">
          <LoginIcon sx={{ mr: 1 }} /> <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={Link} to="/signup">
          <PersonAddIcon sx={{ mr: 1 }} /> <ListItemText primary="Signup" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="primary" sx={{ boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left Section - Logo / Menu Icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", letterSpacing: 1 }}
            >
              VocaTask
            </Typography>
          </Box>

          {/* Center Section - Menu Links (Desktop only) */}
          <Stack
            direction="row"
            spacing={3}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/tasks">
              Tasks
            </Button>
            <Button color="inherit" component={Link} to="/voice">
              Voice Mode
            </Button>
          </Stack>

          {/* Right Section - Login / Signup Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* <IconButton color="inherit" component={Link} to="/login">
              <LoginIcon />
            </IconButton> */}
            <IconButton color="inherit" component={Link} to="/signup">
              <PersonAddIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
