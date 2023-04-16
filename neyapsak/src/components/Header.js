import * as React from "react";
  
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Navigate, useNavigate } from "react-router-dom";

  
export default function Header() {
  let navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login")
  }

  const goToRegister = () => {
    navigate("/register")
  }

  const goToUserPage = () => {
    navigate("/userpage")
  }

  const goToMainPage = () => {
    navigate("/")
  }





  return (
    
      <AppBar position="static">
        <Toolbar>
        <Button color="inherit" onClick={goToMainPage}>Main Page</Button>
        <Button color="inherit" onClick={goToUserPage}>User Page</Button>
          <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
            neYapsak
          </Typography>
          <Button color="inherit" onClick={goToLogin}>Login</Button>
          <Button color="inherit" onClick={goToRegister}>Register</Button>
        </Toolbar>
      </AppBar>
  );
}