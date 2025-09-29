import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./frontend/Components/SignupPage/Signup";
import Login from "./frontend/Components/LoginPage/Login";
import Dashboard from "./frontend/Components/Dashboard/Dashboard";
import ProtectedRoute from "./frontend/routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Default route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
