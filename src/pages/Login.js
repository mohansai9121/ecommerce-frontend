import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input, Button, Panel } from "rsuite";
import { motion } from "framer-motion";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Panel bordered shaded>
          <h2 className="login-title">Welcome Back 👋</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <Input
              placeholder="Email"
              size="lg"
              onChange={(value) => setForm({ ...form, email: value })}
            />

            <Input
              type="password"
              placeholder="Password"
              size="lg"
              onChange={(value) => setForm({ ...form, password: value })}
            />

            <Button appearance="primary" size="lg" block type="submit">
              Login
            </Button>
          </form>

          <p className="login-footer">
            New user? <Link to="/register">Register</Link>
          </p>
        </Panel>
      </motion.div>
    </div>
  );
};

export default Login;
