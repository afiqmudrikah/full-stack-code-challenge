import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import UserContext from "../context/user";

const Login = () => {
  const useCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(false);

  const handleLogin = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + `/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.status === "error") {
        setLoginError(true);
        console.error(data);
      } else {
        useCtx.setAccessToken(data.accessToken);
        setLoginError(false);
      }
    } else {
      console.error(data);
    }
  };

  return (
    <>
      <Container sx={{ bgcolor: "#f4f4f4", vh: 100 }}>
        <Box
          sx={{
            display: "flex",
            width: 1 / 3,
            flexDirection: "column",
            margin: "auto",
            mt: 10,
            textAlign: "center",
            border: "2px solid black",
            borderRadius: "10px",
            boxShadow: "1px 2px",
            p: "2rem",
            bgcolor: "#f4f4f4",
          }}
        >
          <Typography sx={{ mb: 4, fontFamily: "monospace" }} variant="h2">
            Login
          </Typography>
          <TextField
            sx={{ mb: 4 }}
            size="small"
            placeholder="username"
            error={loginError}
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            sx={{ mb: 4 }}
            size="small"
            placeholder="password"
            type="password"
            error={loginError}
            helperText={loginError ? "Invalid username or password" : ""}
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <Button
            sx={{ width: 1 / 5 }}
            variant="outlined"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;
