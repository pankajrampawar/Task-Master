import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage.js';
import AddTask from './components/AddTask.js';
import EditTask from './components/editTask.js';

export default function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="AddTask" element={<AddTask/>} />
            <Route path="/editTask" element={<EditTask/>} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}
