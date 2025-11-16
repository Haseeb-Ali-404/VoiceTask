import React, { useState, useEffect } from "react";
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
import userData from "../utils/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // ✅ Load token ONCE safely
  useEffect(() => {
    const u = userData();
    if (u) {
      setUser(u);
    }
  }, []);

  const drawer = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        backdropFilter: "blur(10px)",
        bgcolor: "rgba(255,255,255,0.8)",
        borderRight: "1px solid #e5e7eb",
        pt: 2,
      }}
      onClick={handleDrawerToggle}
    >
      <Typography
        variant="h6"
        sx={{
          m: 2,
          fontWeight: "bold",
          textAlign: "center",
          letterSpacing: 1,
          color: "#4f46e5",
        }}
      >
        VocaTask
      </Typography>

      <Divider sx={{ mb: 1 }} />

      <List>
        {[
          { text: "Home", path: "/" },
          { text: "Tasks", path: "/tasks" },
          { text: "Voice Mode", path: "/voice" },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              transition: "0.2s",
              "&:hover": {
                bgcolor: "#eef2ff",
              },
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mt: 1, mb: 1 }} />

      {!user ? (
        <List>
          <ListItem
            button
            component={Link}
            to="/login"
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              "&:hover": { bgcolor: "#e0f2fe" },
            }}
          >
            <LoginIcon sx={{ mr: 1, color: "#0284c7" }} />
            <ListItemText primary="Login" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/signup"
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              "&:hover": { bgcolor: "#ede9fe" },
            }}
          >
            <PersonAddIcon sx={{ mr: 1, color: "#8b5cf6" }} />
            <ListItemText primary="Signup" />
          </ListItem>
        </List>
      ) : null}
    </Box>
  );

  return (
    <>
      {/* NAVBAR */}
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(90deg, #4f46e5, #6366f1, #818cf8)",
          height: "56px",
          display: "flex",
          justifyContent: "center",
          boxShadow: "0 2px 15px rgba(0,0,0,0.15)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "56px !important",
            px: { xs: 1.5, md: 3 },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT — Logo + Mobile Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: "flex", md: "none" },
                p: 0.8,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.15)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: "1.2rem",
                color: "white",
                userSelect: "none",
              }}
            >
              VocaTask
            </Typography>
          </Box>

          {/* MIDDLE — Desktop Menu */}
          <Stack
            direction="row"
            spacing={3}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {["Home", "Tasks"].map((item) => (
              <Button
                key={item}
                color="inherit"
                component={Link}
                to={item === "Home" ? "/" : "/tasks"}
                sx={{
                  fontSize: "0.95rem",
                  textTransform: "none",
                  fontWeight: 500,
                  color: "white",
                  px: 1.5,
                  py: 0.2,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>

          {/* RIGHT — User or Signup */}
          <IconButton
            component={Link}
            to={user ? "/profile" : "/signup"}
            sx={{
              backgroundColor: "rgba(255,255,255,0.22)",
              p: 0.8,
              borderRadius: 3,
              color: "white",
              minWidth: "100px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              transition: "0.25s ease",

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
                transform: "scale(1.07)",
              },
            }}
          >
            {user ? (
              <>
                <AccountCircleIcon fontSize="small" />
                <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  {user.userName?.slice(0, 10) || "User"}
                </span>
              </>
            ) : (
              <PersonAddIcon fontSize="small" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 270,
            borderRadius: "0 20px 20px 0",
            background: "linear-gradient(160deg, #f5f7ff, #ffffff 40%)",
            backdropFilter: "blur(16px)",
            boxShadow: "6px 0 28px rgba(0,0,0,0.22)",
            borderRight: "1px solid rgba(99,102,241,0.25)",
            animation: "slideIn 0.3s ease",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          },

          "@keyframes slideIn": {
            from: { transform: "translateX(-50px)", opacity: 0 },
            to: { transform: "translateX(0)", opacity: 1 },
          },
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            color: "white",
            borderBottomLeftRadius: "20px",
            boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            VocaTask Menu
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Navigate your tasks effortlessly
          </Typography>
        </Box>

        

        {/* MENU ITEMS */}
        <Box sx={{ p: 2, flexGrow: 1 }}>
          {[
            { label: "Home", route: "/" },
            { label: "Tasks", route: "/tasks" },
            
          ].map((item, index) => (
            <Button
              key={index}
              component={Link}
              to={item.route}
              onClick={handleDrawerToggle}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 2,
                px: 2,
                py: 1.4,
                mb: 1.3,

                color: "#4f46e5",
                background: "rgba(99,102,241,0.08)",
                transition: "0.25s ease",
                "&:hover": {
                  background: "rgba(99,102,241,0.18)",
                  transform: "translateX(10px)",
                  boxShadow: "0 4px 10px rgba(99,102,241,0.25)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* LOGOUT BUTTON */}
        {user && (
          <Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            <Button
              fullWidth
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              sx={{
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 700,
                borderRadius: 3,
                py: 1.3,
                background:
                  "linear-gradient(135deg, #4f46e5, #6366f1, #818cf8)",
                color: "white",
                boxShadow: "0 4px 18px rgba(99,102,241,0.4)",
                transition: "0.25s",

                "&:hover": {
                  transform: "translateY(-4px)",
                  background:
                    "linear-gradient(135deg, #4338ca, #6366f1, #a5b4fc)",
                  boxShadow: "0 8px 25px rgba(99,102,241,0.45)",
                },

                "&:active": {
                  transform: "scale(0.97)",
                },
              }}
            >
              🔓 Logout
            </Button>
          </Box>
        )}
      </Drawer>
    </>
  );
}
