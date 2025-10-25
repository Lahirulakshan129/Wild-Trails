import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import DriverDashboard from './Pages/DriverDashboard';
import Review from './Pages/Review';
import ProtectedRoute from './components/common/ProtectedRoute';
import Unauthorized from './Pages/util/UnauthorizedPage';
import AdminDashboard from './Pages/AdminDashboard';
import UserDashboard from './Pages/UserDashboard/UserDashboard';
import AdminDashboardPackages from './Pages/AdminDashboard/Packages';
import { Toaster } from 'react-hot-toast';


function App() {
  console.log("App component rendered");

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
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
      <Route path="/review" element={<Review />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/customerDashboard" element={<UserDashboard />} />
      <Route
        path="/AdminDashboard"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AdminDashboard/Packages"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminDashboardPackages/>
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default App;
