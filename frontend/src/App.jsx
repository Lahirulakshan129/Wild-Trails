import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import DriverDashboard from './Pages/DriverDashboard';
import Review from './Pages/Review';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DriverDashboard" element={<DriverDashboard />} />
        <Route path="/review" element={<Review />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
