import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import FeelingLucky from "./components/FeelingLucky";
import Login from "./components/Login";
import Recommendation from "./components/Recommendation"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recommendation" element={<Recommendation />} />
          <Route path="about" element={<About />} />
          <Route path="feeling-lucky" element={<FeelingLucky />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
