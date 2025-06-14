import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import DriverDashboard from './Pages/DriverDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import Unauthorized from './Pages/util/UnauthorizedPage';
import CustomerDashboard from './Pages/Customerdashboard';
import AdminDashboard from './Pages/AdminDashboard';


function App() {
  console.log("App component rendered");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/DriverDashboard"
        element={
          <ProtectedRoute requiredRole="DRIVER">
            <DriverDashboard />
          </ProtectedRoute>
        }
      />
     <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
      <Route
        path="/AdminDashboard"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
     
    </Routes>
  );
}

export default App;
