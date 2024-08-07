import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import FeelingLucky from "./components/FeelingLucky";
import Login from "./components/Login";
import Recommendation from "./components/Recommendation";
import UserInfo from "./components/UserInfo";
import Reviews from "./components/Reviews";
import Watchlists from "./components/Watchlists";

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
          <Route path="account" element={<UserInfo />}>
            <Route path="watchlists" element={<Watchlists />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="logout" element={<div>Log Out</div>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
