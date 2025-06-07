import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import DriverDashboard from './Pages/DriverDashboard';

function App() {
  console.log("App component rendered");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/DriverDashboard" element={<DriverDashboard />} />
    </Routes>
  );
}

export default App;
