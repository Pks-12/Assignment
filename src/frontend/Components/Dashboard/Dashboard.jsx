import { useEffect, useState } from "react";
import API from "../../services/api";  // fixed path
import TaskCard from "../TaskCard/TaskCard"; // same folder
import { Box, Typography, Button, TextField } from "@mui/material";

function Dashboard() {
  const [profile, setProfile] = useState({});
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await API.get("/auth/profile");
      setProfile(data);
    };
    const fetchTasks = async () => {
      const { data } = await API.get("/tasks");
      setTasks(data);
    };
    fetchProfile();
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    const { data } = await API.post("/tasks", { title });
    setTasks([...tasks, data]);
    setTitle("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">Welcome, {profile.name}</Typography>
        <Button variant="contained" color="error" onClick={logout}>Logout</Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task" fullWidth />
        <Button variant="contained" onClick={addTask}>Add</Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {tasks.map(task => <TaskCard key={task._id} task={task} setTasks={setTasks} />)}
      </Box>
    </Box>
  );
}

export default Dashboard;
