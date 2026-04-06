import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import Blog from "./pages/Blog";
import About from "./pages/About";
import "./index.css"
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
