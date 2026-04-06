import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 pt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            <span className="text-green-400">Gorkha</span>Soft
          </h2>
          <p className="text-sm text-green-200">
            Building powerful digital solutions to help businesses grow, scale,
            and innovate in a modern world.
          </p>

          <div className="flex gap-4 mt-6">
            <a className="hover:text-green-400"><Facebook /></a>
            <a className="hover:text-green-400"><Twitter /></a>
            <a className="hover:text-green-400"><Linkedin /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-green-400">Home</Link></li>
            <li><Link to="/services" className="hover:text-green-400">Services</Link></li>
            <li><Link to="/solutions" className="hover:text-green-400">Solutions</Link></li>
            <li><Link to="/blog" className="hover:text-green-400">Blog</Link></li>
            <li><Link to="/about" className="hover:text-green-400">About</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Our Services</h4>
          <ul className="space-y-3 text-sm">
            <li>Custom Software</li>
            <li>Web Development</li>
            <li>Mobile Apps</li>
            <li>Cloud Solutions</li>
            <li>IT Consulting</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>

          <div className="flex items-center gap-3 text-sm mb-3">
            <MapPin className="text-green-400" size={18} />
            Kathmandu, Nepal
          </div>

          <div className="flex items-center gap-3 text-sm mb-3">
            <Phone className="text-green-400" size={18} />
            +977 9800000000
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Mail className="text-green-400" size={18} />
            info@technova.com
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-800 mt-16 py-6 text-center text-sm text-green-300">
        © {new Date().getFullYear()} TechNova. All rights reserved.
      </div>
    </footer>
  );
}
