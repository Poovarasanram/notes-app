import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Notes from '../pages/Notes';
import AppLayout from '../components/AppLayout';


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route
        path="/notes"
        element={
          <AppLayout>
            <Notes />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default AppRouter;
