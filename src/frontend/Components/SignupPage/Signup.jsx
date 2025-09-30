import { useState } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" }); // clear error when typing
  };

  const validate = () => {
    const errors = {};

    // Name: only alphabets
    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      errors.name = "Name should contain only alphabets";
    }

    // Email: valid format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Enter a valid email address";
    }

    // Password: 1 uppercase, 1 lowercase, 1 number, 1 special, length 10
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10}$/.test(
        form.password
      )
    ) {
      errors.password =
        "Password must be 10 characters with 1 uppercase, 1 lowercase, 1 number & 1 special character";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const { data } = await API.post("/auth/signup", form);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
        Signup
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          fullWidth
          error={!!fieldErrors.name}
          helperText={fieldErrors.name}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
          fullWidth
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
        />
        <TextField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          required
          fullWidth
          error={!!fieldErrors.password}
          helperText={fieldErrors.password}
        />
        <Button variant="contained" type="submit" fullWidth sx={{ py: 1.2 }}>
          Signup
        </Button>
      </form>

      <Typography
        sx={{
          mt: 2,
          fontSize: { xs: "0.9rem", sm: "1rem" },
          textAlign: "center",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          Login here
        </Link>
      </Typography>
    </Box>
  );
}

export default Signup;
