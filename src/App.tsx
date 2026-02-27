import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Recruitment from './pages/Recruitment';
import JobPortal from './pages/JobPortal';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="jobs" element={<JobPortal />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
