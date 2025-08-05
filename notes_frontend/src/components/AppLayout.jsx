// src/components/AppLayout.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "./HeaderBar";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login"); // Redirect if token not found
    }
  }, [navigate]);

  return (
    <>
      {token && (
        <div>
          <HeaderBar />
          <div style={{ padding: "20px" }}>{children}</div>
        </div>
      )}
    </>
  );
};

export default AppLayout;
