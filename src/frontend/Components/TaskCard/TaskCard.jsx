import API from "../../services/api"; // fixed path
import { Box, Checkbox, Button } from "@mui/material";

function TaskCard({ task, setTasks }) {
  const toggleComplete = async () => {
    const { data } = await API.put(`/tasks/${task._id}`, { completed: !task.completed });
    setTasks(prev => prev.map(t => t._id === task._id ? data : t));
  };

  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    setTasks(prev => prev.filter(t => t._id !== task._id));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox checked={task.completed} onChange={toggleComplete} />
        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</span>
      </Box>
      <Button variant="contained" color="error" onClick={deleteTask}>Delete</Button>
    </Box>
  );
}

export default TaskCard;
