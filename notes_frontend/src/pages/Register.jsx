import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spin, message } from "antd";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/register/", {
        name: formData.name,
        password: formData.password,
        role: formData.role,
      });
      message.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      message.error("Registration failed. Try a different username.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f6f9fc"
    }}>
      <Spin spinning={loading} tip="Registering..." size="large">
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "450px"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#444" }}>
            Create your account
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={formRowStyle}>
              <label style={labelStyle}>Username:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter username"
              />
            </div>

            <div style={formRowStyle}>
              <label style={labelStyle}>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter password"
              />
            </div>

            <div style={formRowStyle}>
              <label style={labelStyle}>Confirm:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Re-enter password"
              />
            </div>

            <div style={formRowStyle}>
              <label style={labelStyle}>Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#5b3cc4",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                marginTop: "1rem",
                cursor: "pointer"
              }}
            >
              Register
            </button>
          </form>

          <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#5b3cc4", textDecoration: "none" }}>
              Login
            </Link>
          </p>
        </div>
      </Spin>
    </div>
  );
}

const formRowStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem"
};

const labelStyle = {
  width: "120px",
  fontWeight: "bold",
  fontSize: "0.95rem"
};

const inputStyle = {
  flex: 1,
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "0.95rem"
};

export default Register;
