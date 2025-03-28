// src/pages/Home.jsx
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Button, Container } from "@mui/material";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import WeatherInfo from "../components/WeatherInfo";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { selectIsAuthenticated } from "../features/auth/authSlice"; // This should now work

const Home = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="home_main">
      <div className="home_cont">
        <Container>
          <Box>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
          <WeatherInfo />
          <TaskInput />
          <TaskList />
        </Container>
      </div>
    </div>
  );
};

export default Home;
