import { useState } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom"; // <-- import Link
import { TextField, Button, Box, Typography } from "@mui/material";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} type="email" required />
        <TextField label="Password" name="password" value={form.password} onChange={handleChange} type="password" required />
        <Button variant="contained" type="submit">Login</Button>
      </form>

      <Typography sx={{ mt: 2 }}>
        New user?{" "}
        <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
          Signup here
        </Link>
      </Typography>
    </Box>
  );
}

export default Login;
