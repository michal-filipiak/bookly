import { Box, Grid } from "@material-ui/core";
import { Button, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import axios from "axios";
import { useState } from "react";
import "./RegisterView.css";

interface RegisterViewProps {
  setAddUser: any;
}

const Register: React.FC<RegisterViewProps> = (props: RegisterViewProps) => {
  // States for registration
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //register users
  const Registration = (event: any) => {
    event.preventDefault();
    const data = {
      firstName: name,
      lastName: surname,
      login: username,
      password: password,
    };
    axios
      .post("https://bookly.azurewebsites.net/users/add", data)
      .then((result) => {
        console.log(result.data);
        setSubmitted(true);
        setError(false);
        setName("");
        setSurname("");
        setUsername("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handling the form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (name === "" || password === "" || surname === "" || username === "") {
      setError(true);
    } else {
      Registration(event);

      setTimeout(() => {
        props.setAddUser(false);
      }, 1.5 * 1000);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <Box
        sx={{
          display: submitted ? "" : "none",
          textAlign: "center",
          color: "green",
        }}
      >
        Successfully registered!
      </Box>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <Box
        sx={{
          display: error ? "" : "none",
          textAlign: "center",
          color: "red",
        }}
      >
        Please enter all the fields
      </Box>
    );
  };

  return (
    <div className="body">
      <div className="body-inner">
        <CloseIcon
          onClick={() => {
            props.setAddUser(false);
          }}
          className="cls-bttn"
        ></CloseIcon>
        <Box
          sx={{
            display: "block",
            displayPrint: "none",
            textAlign: "center",
            fontSize: 24,
            color: "gray",
          }}
        >
          USER REGISTRATION
        </Box>
        {/* Calling to the methods */}
        <div>
          {errorMessage()}
          {successMessage()}
        </div>
        <form className="body-form">
          {/* Labels and inputs for form data */}
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <InputLabel>Name</InputLabel>
            <TextField
              required
              fullWidth
              variant="standard"
              value={name}
              helperText="Please enter your name"
              onChange={(event) => {
                setName(event.target.value);
                setSubmitted(false);
              }}
            />
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <InputLabel>Surname</InputLabel>
            <TextField
              required
              fullWidth
              value={surname}
              variant="standard"
              helperText="Please enter your surname"
              onChange={(event) => {
                setSurname(event.target.value);
                setSubmitted(false);
              }}
            />
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <InputLabel>Login</InputLabel>
            <TextField
              required
              fullWidth
              value={username}
              variant="standard"
              helperText="Please enter your username"
              onChange={(event) => {
                setUsername(event.target.value);
                setSubmitted(false);
              }}
            />
          </div>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <InputLabel>Password</InputLabel>
            <TextField
              required
              fullWidth
              value={password}
              variant="standard"
              type="password"
              helperText="Please enter your password"
              onChange={(event) => {
                setPassword(event.target.value);
                setSubmitted(false);
              }}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            sx={{ borderRadius: 0 }}
            onClick={handleSubmit}
          >
            Register
          </Button>
          <Button
            type="reset"
            color="error"
            sx={{ borderRadius: 0, float: "right" }}
            onClick={() => {
              props.setAddUser(false);
            }}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
