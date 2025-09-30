import { useState } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
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
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: 400 },
        mx: "auto",
        mt: { xs: 5, md: 10 },
        p: { xs: 2, sm: 3 },
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: { xs: "none", sm: "0 2px 8px rgba(0,0,0,0.1)" },
      }}
    >
      <Typography
        variant="h5"
        mb={2}
        sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem" }, textAlign: "center" }}
      >
        Login
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
          {error}
        </Typography>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          required
          fullWidth
        />
        <Button variant="contained" type="submit" fullWidth sx={{ py: 1.2 }}>
          Login
        </Button>
      </form>

      <Typography
        sx={{
          mt: 2,
          fontSize: { xs: "0.9rem", sm: "1rem" },
          textAlign: "center",
        }}
      >
        New user?{" "}
        <Link
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          Signup here
        </Link>
      </Typography>
    </Box>
  );
}

export default Login;
