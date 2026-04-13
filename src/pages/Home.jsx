import React, { useState, useEffect, useRef } from "react";
import {
  Code, Globe, Headphones, ArrowRight,
  ChevronLeft, ChevronRight, Smartphone,
  BarChart, PenTool, Server, ExternalLink,
  Calendar, User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import heroBg from "../assets/hero-bg.png";
import Footer from "../Components/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';
import chairpersonPhoto from "../assets/chairperson.webp";

// ── STATIC DATA ───────────────────────────────────────────────────

const servicePortfolioItems = [
  { icon: <Globe size={28} />, title: "Website Design & Development", desc: "Stunning, conversion-optimized websites built with modern frameworks and best practices." },
  { icon: <Code size={28} />, title: "E-commerce Solutions", desc: "Robust online stores with secure payment gateways, inventory management, and analytics." },
  { icon: <Server size={28} />, title: "Content Management Systems", desc: "Scalable CMS platforms like WordPress, enabling clients to manage and update their content." },
  { icon: <Smartphone size={28} />, title: "Mobile Responsive Design", desc: "Flawless experiences across all screen sizes, providing a seamless multi-device experience." },
  { icon: <BarChart size={28} />, title: "Search Engine Optimization", desc: "Data-driven SEO strategies that improve rankings, drive organic traffic, and boost conversions." },
  { icon: <Headphones size={28} />, title: "Website Maintenance & Support", desc: "Proactive monitoring, updates, security patches, and technical support for peak performance." },
  { icon: <PenTool size={28} />, title: "UI/UX Design", desc: "User-centered design, wireframing, prototyping, and usability testing for delightful interfaces." },
  { icon: <Code size={28} />, title: "Custom Web Solutions", desc: "Bespoke applications tailored precisely to your business logic, workflows, and integrations." },
  { icon: <PenTool size={28} />, title: "Graphic Design", desc: "Compelling visual identities, marketing collateral, and brand assets that resonate and convert." },
];

const procedures = [
  { number: "01", icon: "fa-solid fa-magnifying-glass", name: "Gathering Information", desc: "We deeply understand your goals, audience, and requirements before a single line is written." },
  { number: "02", icon: "fa-solid fa-code",             name: "Design & Development",  desc: "Our team designs and builds your solution with cutting-edge technology and clean architecture." },
  { number: "03", icon: "fa-solid fa-face-smile",       name: "Customer Satisfaction", desc: "Rigorous QA and client feedback loops ensure every detail meets and exceeds your expectations." },
  { number: "04", icon: "fa-solid fa-rocket",           name: "Deployment",            desc: "Smooth launch, zero-downtime deployment, and ongoing support for long-term success." },
];

const techItems = [
  { icon: "fa-brands fa-js",        name: "JavaScript", color: "#F7DF1E" },
  { icon: "fa-brands fa-python",    name: "Django",     color: "#0C4B33" },
  { icon: "fa-brands fa-wordpress", name: "WordPress",  color: "#21759B" },
  { icon: "fa-brands fa-react",     name: "React",      color: "#61DAFB" },
  { icon: "fa-brands fa-java",      name: "Java",       color: "#007396" },
  { icon: "fa-solid fa-database",   name: "Data",       color: "#4169E1" },
  { icon: "fa-brands fa-bootstrap", name: "Bootstrap",  color: "#7952B3" },
  { icon: "fa-brands fa-vuejs",     name: "Vue.js",     color: "#42B883" },
  { icon: "fa-brands fa-node-js",   name: "Node.js",    color: "#339933" },
  { icon: "fa-brands fa-docker",    name: "Docker",     color: "#2496ED" },
  { icon: "fa-brands fa-figma",     name: "Figma",      color: "#F24E1E" },
  { icon: "fa-brands fa-laravel",   name: "Laravel",    color: "#FF2D20" },
];

const calendarDays = [
  [null, null, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, null, null, null],
];

// ── HELPERS ───────────────────────────────────────────────────────

function truncateWords(text, max = 20) {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  return words.length <= max ? text : words.slice(0, max).join(" ") + "…";
}

function formatDate(str) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-US", {
    month: "short", day: "2-digit", year: "numeric",
  });
}

// ── TECH SLIDER ───────────────────────────────────────────────────

function TechSlider() {
  const doubled  = [...techItems, ...techItems];
  const trackRef = useRef(null);
  const animRef  = useRef(null);
  const posRef   = useRef(0);
  const SPEED    = 0.5;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const singleSetWidth = track.scrollWidth / 2;
    const step = () => {
      posRef.current += SPEED;
      if (posRef.current >= singleSetWidth) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      className="overflow-hidden w-full"
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
    >
      <div ref={trackRef} className="flex gap-6 w-max">
        {doubled.map((tech, i) => (
          <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer flex-shrink-0">
            <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
              <i className={`${tech.icon} text-3xl`} style={{ color: tech.color }} />
            </div>
            <span className="text-xs text-gray-600 font-medium">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SKELETON LOADERS ──────────────────────────────────────────────

function PortfolioSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 bg-gray-100 rounded-full w-14" />
          <div className="h-5 bg-gray-100 rounded-full w-16" />
        </div>
        <div className="h-8 bg-gray-100 rounded-lg w-full mt-2" />
      </div>
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-4/5" />
        <div className="h-3 bg-gray-100 rounded w-1/4 mt-2" />
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();

  const [portfolioPage, setPortfolioPage] = useState(0);
  const itemsPerPage = 3;

  // Portfolio API state
  const [projects,         setProjects]         = useState([]);
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [portfolioError,   setPortfolioError]   = useState(null);

  // Blog API state
  const [blogs,       setBlogs]       = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogError,   setBlogError]   = useState(null);

  // ── Fetch portfolio — mirrors Portfolio.jsx exactly
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setPortfolioLoading(true);
        const res  = await API.get("portfolio/");
        const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
        setProjects(data);
        setPortfolioError(null);
      } catch (err) {
        console.log(err);
        setPortfolioError("Failed to load portfolio data.");
      } finally {
        setPortfolioLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  // ── Fetch blogs — mirrors Blog.jsx exactly
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res  = await API.get("blogs/");
        const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
        setBlogs(data);
        setBlogError(null);
      } catch (err) {
        console.log(err);
        setBlogError("Failed to load blogs.");
      } finally {
        setBlogLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Reset pagination when data refreshes
  useEffect(() => setPortfolioPage(0), [projects]);

  const totalPages      = Math.ceil(projects.length / itemsPerPage);
  const visibleProjects = projects.slice(
    portfolioPage * itemsPerPage,
    portfolioPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="bg-white text-gray-800 font-sans">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative bg-cover bg-center min-h-[90vh] flex items-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="text-white">
            <p className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-4">Welcome to</p>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              <span className="text-green-400">Gorkha Soft,</span>
              <br />where quality and
              <br />innovation collide
            </h1>
            <p className="mt-6 text-gray-300 text-base leading-relaxed max-w-md">
              Our passion is creating innovative digital solutions that enable companies to prosper in the digital era. Our team of skilled technologists and creative thinkers brings your digital vision to life.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <Link to="/services" className="bg-green-500 hover:bg-green-600 px-7 py-3 rounded-lg font-semibold inline-flex items-center gap-2 shadow-lg transition">
                Explore Services <ArrowRight size={18} />
              </Link>
              <Link to="/portfolio" className="border border-white/40 hover:border-white text-white px-7 py-3 rounded-lg font-semibold transition">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE PORTFOLIO ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">Service <span className="text-green-600">Portfolio</span></h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Comprehensive digital solutions tailored to your business needs</p>
            <div className="w-16 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicePortfolioItems.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-white">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCEDURES WE FOLLOW ──────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">Procedures <span className="text-green-600">We Follow</span></h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">A repeatable and reliable process that results in accurate and meaningful output</p>
            <div className="w-16 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {procedures.map((p, i) => (
              <div key={i} className="relative text-center group">
                {i < procedures.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+44px)] w-[calc(100%-88px)] h-px border-t-2 border-dashed border-green-200 z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-green-200 group-hover:border-green-500 shadow-md flex flex-col items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-xl">
                    <i className={`${p.icon} text-green-600 text-xl mb-1`} />
                    <span className="text-xs font-bold text-green-500">{p.number}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">{p.name}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT US + SHAPING THE FUTURE ─────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About <span className="text-green-600">Us</span></h2>
            <div className="w-12 h-1 bg-green-500 rounded-full mb-6" />
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Welcome to GorkhaSoft, where superior design and innovation come together to define the future of the digital age. Our team of talented technologists, skilled designers, and strategic thinkers dedicated to delivering excellence in every project.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              As a premier web development company, we bring together a dynamic team of creative minds and tech enthusiasts dedicated to delivering seamless digital experiences for every client.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:gap-3 transition-all">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-gradient-to-br from-[#0f3b2c] to-[#1a5d4a] rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Shaping the Digital Future</h3>
            <p className="text-green-100 text-sm leading-relaxed mb-4">
              At GorkhaSoft, we craft innovative web solutions customized to each individual client's requirements. Our dynamic team of creative minds and tech enthusiasts is dedicated to delivering excellence.
            </p>
            <p className="text-green-100 text-sm leading-relaxed mb-6">
              We believe in building long-term partnerships, transforming your ideas into powerful digital experiences that drive growth and success.
            </p>
            <Link to="/portfolio" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition">
              View Portfolio <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR PORTFOLIO GRID ────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">Our <span className="text-green-600">Portfolio</span></h2>
            <p className="text-gray-500 mt-3 text-sm">A showcase of projects we've delivered for clients across industries</p>
            <div className="w-16 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
          </div>

          {portfolioError ? (
            <p className="text-center text-red-500 text-sm py-10">{portfolioError}</p>
          ) : portfolioLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => <PortfolioSkeleton key={i} />)}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-10">No portfolio items found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
                    style={{ height: "400px" }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-48 flex-shrink-0 bg-gray-100">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = `https://placehold.co/600x400/0f3b2c/white?text=${encodeURIComponent(project.title)}`;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">🖼</div>
                      )}

                      {/* Category badge — categories is an array of objects {id, name} per API */}
                      {project.categories?.length > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded font-semibold tracking-wide uppercase">
                            {project.categories[0]?.name ?? project.categories[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1 group-hover:text-green-700 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed flex-1">
                        {truncateWords(project.description, 15)}
                      </p>

                      {/* All category tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.categories?.map((cat, t) => (
                          <span key={t} className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                            {cat?.name ?? cat}
                          </span>
                        ))}
                      </div>

                      {/* Read More — uses slug like Portfolio.jsx */}
                      <button
                        onClick={() => navigate(`/portfolio/${project.slug}`)}
                        className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-[#0f3b2c] to-[#1a5d4a] text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-10">
                  <button
                    onClick={() => setPortfolioPage((p) => Math.max(0, p - 1))}
                    disabled={portfolioPage === 0}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-600 hover:border-green-600 hover:text-white disabled:opacity-30 transition"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPortfolioPage(i)}
                      className={`w-9 h-9 rounded-full text-sm font-medium transition ${
                        portfolioPage === i ? "bg-green-600 text-white" : "border border-gray-300 hover:bg-green-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPortfolioPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={portfolioPage === totalPages - 1}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-600 hover:border-green-600 hover:text-white disabled:opacity-30 transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}

          <div className="text-center mt-8">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm border border-green-300 px-6 py-2.5 rounded-full hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
            >
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGIES USED — AUTOPLAY SLIDER ───────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Technologies <span className="text-green-600">Used</span></h2>
            <p className="text-gray-500 mt-2 text-sm">We use various technologies and languages to suit the scope of projects and client needs</p>
          </div>
          <TechSlider />
        </div>
      </section>

      {/* ── FEATURED BLOGS + CALENDAR ────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">Featured <span className="text-green-600">Blogs</span></h2>
            <p className="text-gray-500 mt-3 text-sm">Stay updated with our latest news, events, and insights</p>
            <div className="w-16 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Blog cards — 2 cols */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {blogError ? (
                <p className="col-span-2 text-center text-red-500 text-sm">{blogError}</p>
              ) : blogLoading ? (
                [0, 1, 2, 3].map((i) => <BlogSkeleton key={i} />)
              ) : blogs.length === 0 ? (
                <p className="col-span-2 text-center text-gray-400 text-sm">No blog posts found.</p>
              ) : (
                /* Blog fields from Blog.jsx: photo, subject, detail, created_at, slug */
                blogs.slice(0, 4).map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col"
                  >
                    {post.photo ? (
                      <div className="overflow-hidden h-44 flex-shrink-0">
                        <img
                          src={post.photo}
                          alt={post.subject}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = "https://placehold.co/600x400/1a5d4a/white?text=Blog"; }}
                        />
                      </div>
                    ) : (
                      <div className="h-44 flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-300 text-4xl">📝</div>
                    )}

                    <div className="p-4 flex flex-col flex-1">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(post.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          Admin
                        </span>
                      </div>

                      {/* "subject" = blog title per Blog.jsx */}
                      <h4 className="font-semibold text-gray-800 text-sm mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                        {post.subject}
                      </h4>

                      {/* "detail" = blog body per Blog.jsx */}
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
                        {truncateWords(post.detail, 20)}
                      </p>

                      {/* Read More — navigates to BlogDetail using slug */}
                      <button
                        onClick={() => navigate(`/blog/${post.slug}`)}
                        className="mt-3 self-start inline-flex items-center gap-1 text-green-600 text-xs font-semibold hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Event Calendar sidebar */}
            <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-calendar-days text-green-600" />
                Event Calendar
              </h4>
              <div className="flex items-center justify-between mb-4">
                <button className="text-gray-400 hover:text-green-600 transition"><ChevronLeft size={16} /></button>
                <span className="text-sm font-semibold text-gray-700">April 2026</span>
                <button className="text-gray-400 hover:text-green-600 transition"><ChevronRight size={16} /></button>
              </div>
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="text-gray-400">
                    {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
                      <th key={d} className="pb-2 font-medium">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calendarDays.map((week, wi) => (
                    <tr key={wi}>
                      {week.map((day, di) => (
                        <td key={di} className="py-1.5">
                          {day ? (
                            <span className={`w-7 h-7 inline-flex items-center justify-center rounded-full cursor-pointer text-xs transition
                              ${day === 12 ? "bg-green-600 text-white font-bold" : "text-gray-600 hover:bg-green-50 hover:text-green-700"}`}>
                              {day}
                            </span>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Tech Meetup - Apr 15</p>
                    <p className="text-xs text-gray-500">Kathmandu Innovation Hub</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Product Launch - Apr 28</p>
                    <p className="text-xs text-gray-500">HydroSoft v3.0 Release</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm border border-green-300 px-6 py-2.5 rounded-full hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
            >
              View All Blogs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP / CHAIRMAN MESSAGE ────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
            <div className="h-2 bg-gradient-to-r from-green-600 via-green-100 to-green-600" />
            <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-12">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-full max-w-sm mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-red-500/20 rounded-2xl blur-xl" />
                  <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                    <img
                      src={chairpersonPhoto}
                      alt="Chairperson - Lhakpa Norbu Sherpa"
                      className="w-full h-auto rounded-xl object-cover aspect-[3/4]"
                      onError={(e) => { e.target.src = "https://placehold.co/600x800/2c3e50/white?text=Chairperson"; }}
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-amber-100 rounded-full p-2 shadow-md">
                    <span className="text-2xl">⛰️</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-stone-800">Lhakpa Norbu Sherpa</h3>
                  <p className="text-amber-700 font-medium">Chairperson, Sherpa Sewa Kendra</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full" />
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full" />
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full border border-amber-200">
                    <span className="text-amber-700 text-sm font-semibold tracking-wider">🏔️ LEADERSHIP MESSAGE</span>
                  </div>
                  <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-stone-800">Message from Our Chairperson</h2>
                  <div className="mt-2 w-16 h-1 bg-amber-500 rounded-full" />
                </div>
                <div className="space-y-4 text-stone-700 text-base leading-relaxed">
                  <p>Dear friends and members of the Sherpa community.</p>
                  <p>It is with great pride and humility that I address you as the Chairperson of Sherpa Sewa Kendra. Our organization stands as a testament to the strength, resilience, and unity of our community.</p>
                  <p>In today's rapidly changing world, we face both challenges and opportunities. Our mission remains clear: to preserve our rich cultural heritage while empowering our community through education, welfare, and sustainable development.</p>
                  <p>Together, we will continue to build a brighter future — one that honors our past, serves our present, and secures our future. I invite each of you to join us in this noble journey.</p>
                  <p className="italic text-amber-700 border-l-4 border-amber-500 pl-4">
                    With warm regards and best wishes for our community's continued prosperity.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4 text-stone-400 text-sm">
                  <div className="flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-full">
                    <span>🏔️</span>
                    <span>Preserving heritage · Empowering futures</span>
                  </div>
                  <span className="text-stone-400">Unity • Resilience • Service · Est. 2010</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}