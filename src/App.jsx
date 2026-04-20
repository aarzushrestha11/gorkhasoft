// App.jsx
import BlogDetail from "./pages/Blogdetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import GalleryPage from "./pages/GalleryPage";
import AlbumList from "./pages/AlbumList";
import Blog from "./pages/Blog";
import PortfolioDetail from "./pages/Portfoliodetail";
import Footer from "./Components/Footer";
import Contact from "./pages/Contact";
import ScrollToTop from "./Components/ScrollTop";
import "./index.css"

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/gallery" element={<AlbumList />} />
          <Route path="/gallery/:albumId" element={<GalleryPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}