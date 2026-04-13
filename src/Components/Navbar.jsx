import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";


const links = [
  { to: "/",          label: "Home"      },
  { to: "/services",  label: "Services"  },
  { to: "/solutions", label: "Solutions" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog",      label: "Blog"      },
  { to: "/contact",   label: "Contact"   },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  
  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

 
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a2318]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-200">
            <span className="text-white font-black text-sm">G</span>
          </div>
          <span
            className={`font-bold text-xl tracking-tight transition-colors ${
              scrolled ? "text-white" : "text-black"
            }`}
          >
            Gorkha<span className="text-emerald-400">Soft</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
         {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)} // optional for desktop
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              isActive(l.to)
                ? "text-emerald-400"
                : scrolled
                ? "text-white/80 hover:text-white hover:bg-white/5"
                : "text-black/80 hover:text-black hover:bg-black/5"
            }`}
          >
            {isActive(l.to) && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
              />
            )}
            <span className="relative">{l.label}</span>
          </Link>
        ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            to="/about"
            onClick={() => setOpen(false)} // ✅ add this
            className="block bg-emerald-500 text-white px-4 py-3 rounded-xl"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
        >
          <AnimatePresence initial={false}>
            {links.map((l, i) => (
            <motion.div key={l.to}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)} // ✅ THIS FIXES YOUR ISSUE
                className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive(l.to)
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-white/80 hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#0a2318]/98 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    to={l.to}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(l.to)
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.05, duration: 0.2 }}
                className="mt-2"
              >
                <Link
                  to="/about"
                  className="block bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-xl text-sm font-semibold text-center transition-colors"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}