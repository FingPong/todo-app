import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../contexts/MyContext";
import LogoutIcon from '@mui/icons-material/Logout';
import "../css/Home.css"
// import { TodoContext } from '../contexts/TodoContext';

export const HomePage = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
    // const { tasks } = useContext(TodoContext);

  return (
    <>
      <div className="p-4 box mt-3 text-center-title">
        <h1>WELCOME</h1> <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <LogoutIcon onClick={handleLogout} className="logout-icon" />
      </div>
    </>
  );
}
