import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

export default function VoiceMode({ onText }) {
  const [listening, setListening] = useState(false);
  const [pulse, setPulse] = useState(0);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");

  // Animate pulse (Siri style)
  useEffect(() => {
    if (!listening) return;

    const interval = setInterval(() => {
      setPulse(Math.random()); // dynamic pulsing
    }, 200);

    return () => clearInterval(interval);
  }, [listening]);

  // Stop recognition on unmount
  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  // Initialize Recognition
  const initRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setListening(true);
      transcriptRef.current = "";
    };

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) transcriptRef.current += text + " ";
        else interim += text;
      }
    };

    recognition.onerror = (e) => console.log("Speech error:", e);

    recognition.onend = () => {
      setListening(false);
      const final = transcriptRef.current.trim();
      if (final && onText) onText(final);
    };

    return recognition;
  };

  // Toggle Mic
  const toggle = () => {
    if (!listening) {
      const r = initRecognition();
      if (!r) return alert("Speech Recognition not supported in this browser.");
      recognitionRef.current = r;
      r.start();
    } else {
      recognitionRef.current?.stop();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 2,
      }}
    >
      {/* Mic Button */}
      <Tooltip title={listening ? "Stop Listening" : "Start Voice Command"}>
        <IconButton
          onClick={toggle}
          sx={{
            width: { xs: 85, sm: 100 },
            height: { xs: 85, sm: 100 },
            borderRadius: "50%",

            // BACKGROUND COLORS (changed)
            bgcolor: listening
              ? "linear-gradient(135deg, #ff1744, #d50000)"
              : "linear-gradient(135deg, #4f46e5, #6366f1)",

            background: listening
              ? "linear-gradient(135deg, #ff1744, #d50000)"
              : "linear-gradient(135deg, #6366f1, #818cf8)",

            color: "white",
            position: "relative",
            transition: "0.3s ease",

            // Dynamic glow
            boxShadow: listening
              ? "0 0 35px rgba(255,23,68,0.6)"
              : "0 0 28px rgba(25,118,210,0.5)",

            // HOVER EFFECT (changed)
            "&:hover": {
              transform: "scale(1.08)",
              background: listening
                ? "linear-gradient(135deg, #d50000, #b71c1c)"
                : "linear-gradient(135deg, #818cf8  , #6366f1)",
              boxShadow: listening
                ? "0 0 45px rgba(255,23,68,0.85)"
                : "0 0 35px rgba(25,118,210,0.7)",
            },
          }}
        >
          {listening ? (
            <StopIcon sx={{ fontSize: { xs: 40, sm: 48 } }} />
          ) : (
            <MicIcon sx={{ fontSize: { xs: 40, sm: 48 } }} />
          )}
        </IconButton>
      </Tooltip>

      {/* Siri Wave Animation */}
      <Box sx={{ position: "relative", width: 120, height: 40 }}>
        {[1, 2, 3, 4, 5].map((bar) => (
          <Box
            key={bar}
            sx={{
              position: "absolute",
              left: `${bar * 18}px`,
              bottom: 0,
              width: 10,
              height: listening ? 10 + pulse * (bar * 8) : 10,
              borderRadius: 5,
              transition: "height 0.2s ease",
              bgcolor: listening ? "primary.main" : "grey.400",
              animation: listening ? "wave 0.8s infinite ease-in-out" : "none",
              animationDelay: `${bar * 0.1}s`,
            }}
          />
        ))}

        {/* Wave Animation Keyframes */}
        <style>
          {`
            @keyframes wave {
              0% { transform: scaleY(1); }
              50% { transform: scaleY(2); }
              100% { transform: scaleY(1); }
            }
          `}
        </style>
      </Box>

      {/* Status */}
      <Typography
        variant="body1"
        sx={{
          opacity: 0.85,
          fontStyle: "italic",
          textAlign: "center",
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        {listening ? "Listening…" : "Tap the mic to speak"}
      </Typography>
    </Box>
  );
}
