import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button, Panel } from "rsuite";
import { motion } from "framer-motion";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await API.post("/auth/register", form);

      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <motion.div
        className="register-box"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Panel bordered shaded>
          <h2 className="register-title">Create Account 🚀</h2>

          <form onSubmit={handleSubmit} className="register-form">
            <Input
              placeholder="Full Name"
              size="lg"
              onChange={(value) => setForm({ ...form, name: value })}
            />

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

            <Button
              appearance="primary"
              size="lg"
              block
              type="submit"
              loading={loading}
            >
              Register
            </Button>
          </form>

          <p className="register-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Panel>
      </motion.div>
    </div>
  );
};

export default Register;
