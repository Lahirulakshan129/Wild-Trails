import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import DriverDashboard from './Pages/DriverDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import Unauthorized from './Pages/util/UnauthorizedPage';

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
    </Routes>
  );
}

export default App;
