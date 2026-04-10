import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-green-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-white font-bold text-2xl tracking-wide">
          <span className="text-green-400">Gorkha</span>Soft
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10 text-white font-medium">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/services" className="hover:text-green-400">Services</Link>
          <Link to="/solutions" className="hover:text-green-400">Solutions</Link>
          <Link to="/blog" className="hover:text-green-400">Blog</Link>
         <Link to="/contact" className="hover:text-green-400">Contact</Link> 
          <Link to="/portfolio" className="hover:text-green-400">Portfolio</Link> 

          <Link
            to="/about"
            className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold shadow-lg transition"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-green-900/95 px-6 pb-6 text-white space-y-4">
          <Link onClick={close} to="/">Home</Link>
          <Link onClick={close} to="/services">Services</Link>
          <Link onClick={close} to="/solutions">Solutions</Link>
          <Link onClick={close} to="/blog">Blog</Link>
          <Link onClick={close} to="/about">Contact</Link>

          <Link
            onClick={close}
            to="/about"
            className="block bg-green-500 hover:bg-green-600 py-3 text-center rounded-lg font-semibold"
          >
            Get Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
