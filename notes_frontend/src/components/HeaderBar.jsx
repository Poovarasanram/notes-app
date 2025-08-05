import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function HeaderBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button type="primary" danger onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default HeaderBar;
