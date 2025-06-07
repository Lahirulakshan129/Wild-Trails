import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import DriverDashboard from './Pages/DriverDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/DriverDashboard" element={<DriverDashboard />} />
    </Routes>
  );
}

export default App;
