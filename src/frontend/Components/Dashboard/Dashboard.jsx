import { useEffect, useState } from "react";
import API from "../../services/api";  // fixed path
import TaskCard from "../TaskCard/TaskCard"; 
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
    <Box 
      sx={{ 
        maxWidth: { xs: "100%", sm: 600 }, 
        mx: "auto", 
        mt: { xs: 4, md: 10 }, 
        p: { xs: 2, sm: 3 } 
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" }, 
          justifyContent: "space-between", 
          alignItems: { xs: "flex-start", sm: "center" }, 
          mb: 3, 
          gap: 2 
        }}
      >
        <Typography variant="h5" sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>
          Welcome, {profile.name}
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          onClick={logout}
          sx={{ alignSelf: { xs: "flex-end", sm: "center" } }}
        >
          Logout
        </Button>
      </Box>

      {/* Add Task */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" }, 
          gap: 2, 
          mb: 3 
        }}
      >
        <TextField 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="New Task" 
          fullWidth 
        />
        <Button 
          variant="contained" 
          onClick={addTask} 
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add
        </Button>
      </Box>

      {/* Tasks */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} setTasks={setTasks} />
        ))}
      </Box>
    </Box>
  );
}

export default Dashboard;
