import React, { useState, useRef, useEffect } from "react";
import useFetch from "../hooks/useFetch";

import Code from "lucide-react/dist/esm/icons/code";
import Globe from "lucide-react/dist/esm/icons/globe";
import Headphones from "lucide-react/dist/esm/icons/headphones";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Smartphone from "lucide-react/dist/esm/icons/smartphone";
import BarChart from "lucide-react/dist/esm/icons/bar-chart";
import Server from "lucide-react/dist/esm/icons/server";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import PenTool from "lucide-react/dist/esm/icons/pen-tool";
import ExternalLink from "lucide-react/dist/esm/icons/external-link";
import { Link } from "react-router-dom";

import { motion, useInView } from "framer-motion";
import '@fortawesome/fontawesome-free/css/all.min.css';
import chairpersonPhoto from "../assets/chairperson.webp";
import PortfolioCard from "../Components/PortfolioCard";
import BlogCard from "../Components/BlogCard";
import LazyImage from "../Components/LazyLoading";




const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});



function AnimSection({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ label, title, accent, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger(0.1)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="text-center mb-14"
    >
      {label && (
        <motion.p
          variants={fadeUp}
          className="text-xs font-bold tracking-widest uppercase text-emerald-500 mb-3"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-4xl font-extrabold text-gray-900 tracking-tight"
      >
        {title} <span className="text-emerald-600">{accent}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={fadeUp}
        className="w-10 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"
      />
    </motion.div>
  );
}


const SERVICE_ITEMS = [
  {
    icon: <Globe size={20} />,
    title: "Website Design & Development",
    desc: "Stunning, conversion-optimized websites built with modern frameworks and best practices.",
  },
  {
    icon: <Code size={20} />,
    title: "E-commerce Solutions",
    desc: "Robust online stores with secure payment gateways, inventory management, and analytics.",
  },
  {
    icon: <Server size={20} />,
    title: "Content Management Systems",
    desc: "Scalable CMS platforms like WordPress, enabling clients to manage and update their content.",
  },
  {
    icon: <Smartphone size={20} />,
    title: "Mobile Responsive Design",
    desc: "Flawless experiences across all screen sizes, providing a seamless multi-device experience.",
  },
  {
    icon: <BarChart size={20} />,
    title: "Search Engine Optimization",
    desc: "Data-driven SEO strategies that improve rankings, drive organic traffic, and boost conversions.",
  },
  {
    icon: <Headphones size={20} />,
    title: "Maintenance & Support",
    desc: "Proactive monitoring, updates, security patches, and technical support for peak performance.",
  },
  {
    icon: <PenTool size={20} />,
    title: "UI/UX Design",
    desc: "User-centered design, wireframing, prototyping, and usability testing for delightful interfaces.",
  },
  {
    icon: <Code size={20} />,
    title: "Custom Web Solutions",
    desc: "Bespoke applications tailored precisely to your business logic, workflows, and integrations.",
  },
  {
    icon: <PenTool size={20} />,
    title: "Graphic Design",
    desc: "Compelling visual identities, marketing collateral, and brand assets that resonate.",
  },
];

const PROCEDURES = [
  {
    number: "01",
    icon: "fa-solid fa-magnifying-glass",
    name: "Gathering Information",
    desc: "We deeply understand your goals, audience, and requirements before a single line is written.",
  },
  {
    number: "02",
    icon: "fa-solid fa-code",
    name: "Design & Development",
    desc: "Our team designs and builds your solution with cutting-edge technology and clean architecture.",
  },
  {
    number: "03",
    icon: "fa-solid fa-face-smile",
    name: "Customer Satisfaction",
    desc: "Rigorous QA and client feedback loops ensure every detail meets your expectations.",
  },
  {
    number: "04",
    icon: "fa-solid fa-rocket",
    name: "Deployment",
    desc: "Smooth launch, zero-downtime deployment, and ongoing support for long-term success.",
  },
];

const techItems = [
  { icon: "fa-brands fa-react", name: "React.js", desc: "Frontend ecosystem", color: "#61DAFB" },
  { icon: "fa-brands fa-vuejs", name: "Vue.js", desc: "Reactive UIs", color: "#42B883" },
  { icon: "fa-brands fa-angular", name: "Angular", desc: "Enterprise ready", color: "#DD0031" },
  { icon: "fa-brands fa-python", name: "Python", desc: "Django, FastAPI", color: "#3776AB" },
  { icon: "fa-brands fa-node-js", name: "Node.js", desc: "Backend JS", color: "#339933" },
  { icon: "fa-brands fa-laravel", name: "Laravel", desc: "PHP artisan", color: "#FF2D20" },
  { icon: "fa-brands fa-java", name: "Java", desc: "Spring Boot", color: "#007396" },
  { icon: "fa-brands fa-js", name: "JavaScript", desc: "Core language", color: "#F7DF1E" },
  { icon: "fa-brands fa-php", name: "PHP", desc: "Server-side scripting", color: "#777BB4" },
  { icon: "fa-brands fa-golang", name: "Go", desc: "High performance", color: "#00ADD8" },
  { icon: "fa-solid fa-cloud", name: "AWS Cloud", desc: "Scalable infra", color: "#FF9900" },
  { icon: "fa-solid fa-database", name: "PostgreSQL", desc: "Reliable DB", color: "#4169E1" },
  { icon: "fa-brands fa-figma", name: "Figma", desc: "UI/UX design", color: "#F24E1E" },
  { icon: "fa-brands fa-docker", name: "Docker", desc: "Containerization", color: "#2496ED" },
  { icon: "fa-brands fa-git-alt", name: "Git", desc: "Version control", color: "#F05032" },
  { icon: "fa-solid fa-code", name: "TypeScript", desc: "Type-safe JS", color: "#3178C6" },
];
const HERO_STATS = [
  ["50+", "Projects Delivered"],
  ["8+", "Years Experience"],
  ["100%", "Client Satisfaction"],
];


function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#071a10]">
      <img
        src="/hero-bg.webp"
        alt=""
        fetchpriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#071a10] via-[#0d2d1a]/90 to-[#0f3b24]/80" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/5 w-64 h-64 bg-teal-400/8 rounded-full blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
          >
            <Sparkles size={12} /> Welcome to GorkhaSoft
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
          >
            Where <span className="text-emerald-400">Quality</span>
            <br />& Innovation <span className="text-emerald-400">Collide</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-lg leading-relaxed max-w-lg mb-10"
          >
            We create innovative digital solutions that enable companies to
            prosper in the digital era. Skilled technologists and creative
            thinkers — bringing your vision to life.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-4 flex-wrap">
            <Link
              to="/services"
              className="group bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Services
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
            <Link
              to="/portfolio"
              className="border border-white/20 hover:border-white/50 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:bg-white/5"
            >
              View Portfolio
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-16 flex gap-12 flex-wrap">
            {HERO_STATS.map(([number, label]) => (
              <div key={label}>
                <p className="text-3xl font-extrabold text-white">{number}</p>
                <p className="text-sm text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/25 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="What We Do"
          title="Service"
          accent="Portfolio"
          subtitle="Comprehensive digital solutions tailored to your business needs"
        />
        <motion.div
          ref={ref}
          variants={stagger(0.07)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICE_ITEMS.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-lg hover:border-emerald-100 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm group-hover:text-emerald-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProceduresSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section className="py-24 bg-[#f0f7f4]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="How We Work"
          title="Procedures"
          accent="We Follow"
          subtitle="A repeatable and reliable process that results in accurate and meaningful output"
        />
        <motion.div
          ref={ref}
          variants={stagger(0.12)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROCEDURES.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative text-center group"
            >
              {i < PROCEDURES.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+48px)] w-[calc(100%-96px)] border-t-2 border-dashed border-emerald-200 z-0" />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-20 h-20 rounded-2xl bg-white border-2 border-emerald-100 group-hover:border-emerald-400 shadow-sm flex flex-col items-center justify-center mb-5 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-emerald-100"
                >
                  <i className={`${step.icon} text-emerald-500 text-xl mb-1`} />
                  <span className="text-xs font-bold text-emerald-400">
                    {step.number}
                  </span>
                </motion.div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm group-hover:text-emerald-700 transition-colors">
                  {step.name}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <AnimSection>
          <p className="text-xs font-bold tracking-widest uppercase text-emerald-500 mb-3">
            Who We Are
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            About <span className="text-emerald-600">GorkhaSoft</span>
          </h2>
          <div className="w-10 h-1 bg-emerald-500 rounded-full mb-6" />
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Welcome to GorkhaSoft, where superior design and innovation come
            together to define the future of the digital age. Our team of
            talented technologists, skilled designers, and strategic thinkers
            are dedicated to delivering excellence in every project.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-7">
            As a premier web development company, we bring together a dynamic
            team of creative minds and tech enthusiasts dedicated to delivering
            seamless digital experiences.
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm border border-emerald-200 px-5 py-2.5 rounded-xl hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200"
          >
            Learn More{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </AnimSection>

        <AnimSection delay={0.15}>
          <div className="relative bg-gradient-to-br from-[#0d2d1a] to-[#1a5d4a] rounded-3xl p-8 text-white shadow-2xl shadow-emerald-900/20 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-400/10 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-500/10 rounded-full" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/20 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <Sparkles size={11} /> Our Mission
              </div>
              <h3 className="text-2xl font-extrabold mb-4 leading-tight">
                Shaping the Digital Future
              </h3>
              <p className="text-emerald-100/80 text-sm leading-relaxed mb-4">
                At GorkhaSoft, we craft innovative web solutions customized to
                each individual client's requirements. Our dynamic team is
                dedicated to delivering excellence.
              </p>
              <p className="text-emerald-100/80 text-sm leading-relaxed mb-7">
                We believe in building long-term partnerships, transforming your
                ideas into powerful digital experiences that drive growth and
                success.
              </p>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 bg-white text-emerald-800 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-all duration-200 shadow-lg"
              >
                View Portfolio <ExternalLink size={13} />
              </Link>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

function PortfolioSection({ projects, loading, error }) {
  const [page, setPage] = useState(0);
  const perPage = 3;
  
  // Handle both array and paginated response
  let projectsArray = [];
  if (Array.isArray(projects)) {
    projectsArray = projects;
  } else if (projects && projects.results && Array.isArray(projects.results)) {
    projectsArray = projects.results;
  } else {
    projectsArray = [];
  }
  
  const totalPages = Math.ceil(projectsArray.length / perPage);
  const safePage = totalPages === 0 ? 0 : Math.min(page, totalPages - 1);
  const visibleProjects = projectsArray.slice(safePage * perPage, safePage * perPage + perPage);

  return (
    <section className="py-24 bg-[#f0f7f4]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Featured"
          accent="Projects"
          subtitle="Our recent work"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projectsArray.length === 0 ? (
          <p className="text-gray-500 text-center">No projects found.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {visibleProjects.map((project, i) => (
                <PortfolioCard key={project.id} project={project} index={i} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-3 py-1 rounded ${
                      page === i ? "bg-emerald-600 text-white" : "bg-white border"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        <div className="text-center mt-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-emerald-700 font-semibold border px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 transition-colors"
          >
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
function TechSlider() {
  const doubled = [...techItems, ...techItems];
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    const step = () => {
      posRef.current = (posRef.current + 0.6) % half;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      className="overflow-hidden w-full py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div ref={trackRef} className="flex gap-15 w-max">
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2.5 group cursor-pointer flex-shrink-0"
          >
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:-translate-y-1.5 group-hover:border-emerald-200 transition-all duration-300">
              <i
                className={`${tech.icon} text-4xl`}
                style={{ color: tech.color }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechStackSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Our Stack"
          title="Technologies"
          accent="We Use"
          subtitle="Carefully chosen tools and languages to best suit each project's scope and client needs"
        />
        <TechSlider />
      </div>
    </section>
  );
}

function BlogsSection({ blogs, loading, error }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Latest"
          accent="Blogs"
          subtitle="Insights and updates"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {(blogs ?? []).slice(0, 4).map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-emerald-700 font-semibold border px-6 py-3 rounded-xl bg-white"
          >
            View All Blogs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ChairmanSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <AnimSection>
          <div className="relative bg-gradient-to-br from-[#071a10] to-[#0f3b24] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/6 rounded-full blur-[80px] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative grid md:grid-cols-2">
              <div className="flex flex-col items-center justify-center p-10 md:border-r border-white/10">
                <div className="relative">
                  <div className="w-52 h-52 rounded-2xl overflow-hidden border-2 border-emerald-400/20 shadow-xl">
                    <LazyImage
                      src={chairpersonPhoto}
                      alt="Chairperson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-lg">⛰️</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-white">
                    Biswo Shrestha
                  </h3>
                  <p className="text-emerald-400 text-sm font-medium mt-1">
                    Chairperson, GorkhaSoft
                  </p>
                  <div className="flex justify-center gap-1.5 mt-3">
                    <span className="w-6 h-1 bg-emerald-500 rounded-full" />
                    <span className="w-2 h-1 bg-emerald-400/40 rounded-full" />
                    <span className="w-2 h-1 bg-emerald-400/20 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="p-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 w-fit">
                  🏔️ Leadership Message
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-5 leading-tight">
                  Message from Our Chairperson
                </h2>
                <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                  <p>Dear friends and valued clients of GorkhaSoft,</p>
                  <p>
                    It is with great pride that I address you as Chairperson.
                    Our organization stands as a testament to the strength,
                    resilience, and unity of our team.
                  </p>
                  <p>
                    Our mission remains clear: to deliver outstanding digital
                    solutions while empowering businesses through innovation,
                    excellence, and sustainable development.
                  </p>
                  <p className="italic text-emerald-300 border-l-2 border-emerald-500 pl-4">
                    With warm regards and best wishes for continued growth and
                    prosperity.
                  </p>
                </div>
                <div className="mt-7 flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Innovation · Excellence · Growth
                </div>
              </div>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

// ── Main export ───────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    document.title = "Home - GorkhaSoft";
  }, []);


  const {
    data: projects = [],
    loading: pLoading,
    error: pError,
  } = useFetch("portfolio/");

  const {
    data: blogs = [],
    loading: bLoading,
    error: bError,
  } = useFetch("blogs/");

  return (
    <div className="bg-[#f8faf9] text-gray-900 font-sans">
      <HeroSection />
      <ServicesSection />
      <ProceduresSection />
      <AboutSection />

      {/* Portfolio */}
      <PortfolioSection
        projects={projects}
        loading={pLoading}
        error={pError}
      />

      <TechStackSection />

      {/* Blogs */}
      <BlogsSection
        blogs={blogs}
        loading={bLoading}
        error={bError}
      />

      <ChairmanSection />
    </div>
  );
}