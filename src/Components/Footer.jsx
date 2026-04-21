/* eslint-disable no-unused-vars */
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { to: "/",          label: "Home"      },
  { to: "/services",  label: "Services"  },
  // { to: "/solutions", label: "Solutions" },
  { to: "/gallery",   label: "Gallery"   },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog",      label: "Blog"      },
  { to: "/about",     label: "About"     },
];

const services = ["Custom Software", "Web Development", "Mobile Applications", "Cloud Solutions", "UI/UX Design", "IT Consulting"];

const socials = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter,  href: "#", label: "Twitter"  },
  { Icon: Linkedin, href: "#", label: "LinkedIn"  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#071a10] text-slate-300 overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-black text-base">G</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Gorkha<span className="text-emerald-400">Soft</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Building powerful digital solutions to help businesses grow, scale, and innovate in a modern world.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Contact</h4>
            <div className="space-y-3.5">
              {[
                { Icon: MapPin, text: "Kathmandu, Nepal"     },
                { Icon: Phone,  text: "+977 9800000000"      },
                { Icon: Mail,   text: "info@gorkhasoft.com"  },
              // eslint-disable-next-line no-unused-vars
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <Icon size={13} className="text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-400">{text}</span>
                </div>
              ))}
            </div>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Get in Touch <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} GorkhaSoft. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-500">Systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}