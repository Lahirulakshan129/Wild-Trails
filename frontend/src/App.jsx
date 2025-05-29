import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import DriverDashboard from './Pages/DriverDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/driver-dashboard" element={<DriverDashboard />} />
    </Routes>
  );
}

export default App;
