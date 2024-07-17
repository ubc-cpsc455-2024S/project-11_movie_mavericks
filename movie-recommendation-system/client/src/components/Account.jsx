import React from "react";
import { Paper, Box, Grid, TextField, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { editUser } from "../features/userSlice";
import axios from "axios";

const Account = () => {
  const { username: initialUsername, password: initialPassword } = useSelector(
    (state) => ({
      username: state.user.username,
      password: state.user.password,
    })
  );
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState(initialPassword);

  const dispatch = useDispatch();

  const applyChanges = async (e) => {
    if (!username || !password) {
      alert("Please enter values for all fields");
      return;
    }
    const user = { username: username, password: password };
    try {
      const url = `http://localhost:3000/users/${username}`;
      const response = await axios.put(url, user);
      dispatch(
        editUser({
          username: response.data.username,
          password: response.data.password,
        })
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: "50px 30px",
        marginBottom: 2,
        backgroundColor: "#F9D689",
        borderRadius: 10,
      }}
    >
      <Box sx={{ flexGrow: 1, paddingLeft: 3, paddingTop: 4 }}>
        <Outlet />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} sx={{ margin: "30px 50px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="username"
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    marginBottom: 2,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "black",
                    borderRadius: 35,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="password"
                  type="password"
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={applyChanges}
                >
                  Apply Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Account;
