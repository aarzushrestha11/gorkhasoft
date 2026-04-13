import React, { useState } from "react";
import {
  Code,
  Globe,
  Headphones,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Cloud,
  Shield,
  Database,
  BarChart,
  PenTool,
  Server,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import ctaBg from "../assets/cta-bg.png";
import Navbar from "../Components/Navbar";
import heroBg from "../assets/hero-bg.png";
import solution1 from "../assets/solution1.webp";
import solution2 from "../assets/solution2.png";
import solution3 from "../assets/solution3.png";
import solution from "../assets/solution.jpg";
import solution5 from "../assets/solution5.jpg";
import solution6 from "../assets/solution6.png";
import blog1 from "../assets/blog1.avif";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";
import Footer from "../Components/Footer";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Portfolio images for carousel
import portfolioImg from "../assets/portfolioImg.jpeg";
import portfolioImg2 from "../assets/portfolioImg2.webp";
import portfolioImg3 from "../assets/portfolioImg3.png";
import portfolioImg4 from "../assets/portfolioImg4.jpeg";
import portfolioImg5 from "../assets/portfolioImg5.webp";

// Workflow process images
import process1Img from "../assets/process1.jpeg";
import process2Img from "../assets/process2.avif";
import process3Img from "../assets/process3.jpeg";
import process4Img from "../assets/process4.jpg";

// Chairperson photo (replace with your actual image)
import chairpersonPhoto from "../assets/chairperson.webp"; // <-- Add your image here

const carousels = [
  [
    { img: solution1, title: "Project Management" },
    { img: solution2, title: "Cloud Solutions" },
  ],
  [
    { img: solution3, title: "Automation Tools" },
    { img: solution, title: "CRM Systems" },
  ],
  [
    { img: solution5, title: "AI Tools" },
    { img: solution6, title: "Business Analytics" },
  ],
];

// Portfolio Carousel Items
const portfolioCarouselItems = [
  {
    img: portfolioImg,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A fully responsive e-commerce solution with payment integration, inventory management, and real-time analytics.",
  },
  {
    img: portfolioImg2,
    title: "Healthcare App",
    category: "Mobile App",
    description: "Patient management system with real-time analytics, appointment scheduling, and telemedicine features.",
  },
  {
    img: portfolioImg3,
    title: "Dashboard UI/UX",
    category: "UI/UX Design",
    description: "Modern dashboard design for data visualization with interactive charts and real-time updates.",
  },
  {
    img: portfolioImg4,
    title: "Cloud Migration",
    category: "Cloud Solutions",
    description: "Seamless migration to AWS cloud infrastructure with zero downtime and enhanced security.",
  },
  {
    img: portfolioImg5,
    title: "AI Chatbot",
    category: "Artificial Intelligence",
    description: "Intelligent customer support automation tool with natural language processing and 24/7 availability.",
  },
];


// Technology items with respective logos
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

// Service Portfolio Items
const servicePortfolioItems = [
  { icon: <Code size={32} />, title: "Custom Software Development", desc: "Tailored solutions built specifically for your business needs and workflows." },
  { icon: <Smartphone size={32} />, title: "Mobile App Development", desc: "Native and cross-platform mobile apps for iOS and Android platforms." },
  { icon: <Globe size={32} />, title: "Web Development", desc: "Responsive, scalable web applications using modern frameworks." },
  { icon: <Cloud size={32} />, title: "Cloud Solutions", desc: "AWS, Azure, and Google Cloud integration and migration services." },
  { icon: <Shield size={32} />, title: "Cybersecurity", desc: "Advanced security audits, penetration testing, and data protection." },
  { icon: <Database size={32} />, title: "Data Analytics", desc: "Business intelligence, data warehousing, and predictive analytics." },
  { icon: <BarChart size={32} />, title: "Digital Marketing", desc: "SEO, social media, and data-driven marketing strategies." },
  { icon: <PenTool size={32} />, title: "UI/UX Design", desc: "User-centered design, wireframing, prototyping, and usability testing." },
  { icon: <Server size={32} />, title: "DevOps Services", desc: "CI/CD pipelines, containerization, and infrastructure automation." },
];

// Workflow Process Items with images
const workflowProcesses = [
  { 
    number: "01", 
    name: "Gathering Information", 
    description: "We start by understanding your business goals, requirements, and target audience.",
    image: process1Img,
    icon: "fa-solid fa-magnifying-glass"
  },
  { 
    number: "02", 
    name: "Design & Development", 
    description: "Our team designs and develops your solution using cutting-edge technologies.",
    image: process2Img,
    icon: "fa-solid fa-code"
  },
  { 
    number: "03", 
    name: "Customer Satisfaction", 
    description: "We ensure every aspect meets your expectations through rigorous testing and feedback.",
    image: process3Img,
    icon: "fa-solid fa-face-smile"
  },
  { 
    number: "04", 
    name: "Deployment", 
    description: "Smooth launch, deployment, and ongoing support for long-term success.",
    image: process4Img,
    icon: "fa-solid fa-rocket"
  },
];

// Blog posts data
const blogPosts = [
  {
    id: 1,
    img: blog1,
    tag: "Technology",
    title: "Top 5 Trends in Software Development for 2024",
    excerpt: "Discover the latest trends shaping the software development industry in 2024.",
  },
  {
    id: 2,
    img: blog2,
    tag: "Cloud",
    title: "How Cloud Computing Can Benefit Your Business",
    excerpt: "Learn how cloud computing can transform your business operations and reduce costs.",
  },
  {
    id: 3,
    img: blog3,
    tag: "AI",
    title: "Announcing Our New Process Management Tool",
    excerpt: "Introducing our latest innovation in process management and automation.",
  },
];

export default function Home() {
  const navigate = useNavigate(); 
  const [indexes, setIndexes] = useState([0, 0, 0]);
  const [portfolioIndex, setPortfolioIndex] = useState(0);

  const next = (i) => {
    const copy = [...indexes];
    copy[i] = (copy[i] + 1) % carousels[i].length;
    setIndexes(copy);
  };

  const prev = (i) => {
    const copy = [...indexes];
    copy[i] = (copy[i] - 1 + carousels[i].length) % carousels[i].length;
    setIndexes(copy);
  };

  const nextPortfolio = () => {
    setPortfolioIndex((prevIndex) => (prevIndex + 1) % portfolioCarouselItems.length);
  };

  const prevPortfolio = () => {
    setPortfolioIndex((prevIndex) => (prevIndex - 1 + portfolioCarouselItems.length) % portfolioCarouselItems.length);
  };
  const handleViewServices = () => {
    navigate("/services");
  };
  const handleReadMore = () => {
    window.location.href = '/blog';
  };

  return (
    <div className="bg-slate-50 text-gray-800">
      <Navbar />

      {/* HERO */}
      <section
        className="relative bg-cover bg-center h-[85vh] flex items-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-600/60"></div>
        <div className="relative max-w-xl mx-[22rem] px-6 text-white">
          <h1 className="text-5xl md:text-6xl font-bold">
            Future-Forward <br /> Technology for Success
          </h1>
          <p className="mt-6 max-w-xl text-lg text-green-100">
            Innovative solutions designed to boost your business to new heights.
          </p>
          <button className="mt-8 bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-xl text-white font-semibold inline-flex items-center gap-3 shadow-xl">
            Get Started <ArrowRight />
          </button>
        </div>
      </section>

      {/* SERVICE PORTFOLIO SECTION */}
      <section id="services-portfolio">
        <section className="py-24 bg-gradient-to-br from-white to-green-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h5 className="text-green-600 font-semibold text-lg mb-3 tracking-wide">Globally renowned & trusted</h5>
              <div className="title-main">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                  Service <span className="text-[#0f3b2c]">Portfolio</span>
                </h2>
              </div>
              <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                Comprehensive solutions tailored to meet your unique business challenges and drive digital transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicePortfolioItems.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100"
                >
                  <div className="text-green-600 mb-4 group-hover:text-green-700 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#0f3b2c] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>

<div className="text-center mt-10">
          <button
            onClick={handleViewServices} // ✅ FIXED
            className="bg-green-700 text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto"
          >
            View All Services <ArrowRight size={18} />
          </button>
        </div>          </div>
        </section>
      </section>

      {/* PORTFOLIO SECTION WITH ENLARGED SLIDING CAROUSEL */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Our <span className="text-[#0f3b2c]">Work Portfolio</span>
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Explore our creative projects and digital solutions crafted with precision and passion.
            </p>
          </div>

          {/* Enlarged Sliding Carousel */}
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${portfolioIndex * 100}%)` }}
              >
                {portfolioCarouselItems.map((item, idx) => (
                  <div key={idx} className="w-full flex-shrink-0">
                    <div className="relative">
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="w-full h-[500px] object-cover"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/1600x500/0f3b2c/white?text=${item.title}`;
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 text-white">
                        <span className="text-sm bg-green-500 px-4 py-1.5 rounded-full inline-block mb-3 font-semibold">
                          {item.category}
                        </span>
                        <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-200 text-lg max-w-2xl">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevPortfolio}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={28} className="text-[#0f3b2c]" />
            </button>
            <button
              onClick={nextPortfolio}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={28} className="text-[#0f3b2c]" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-4 mt-8">
              {portfolioCarouselItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPortfolioIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    portfolioIndex === idx 
                      ? "bg-green-500 w-8 h-3" 
                      : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/portfolio" className="inline-flex items-center gap-2 bg-[#0f3b2c] hover:bg-[#0a2a1f] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-xl">
              View All Projects <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION (Original 3 Services) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">Core Services</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Code size={36} />,
              title: "Custom Software Development",
              desc: "Tailored software solutions crafted to meet your specific business needs.",
            },
            {
              icon: <Globe size={36} />,
              title: "Web & Mobile App Development",
              desc: "High-performance web and mobile apps designed to engage your audience.",
            },
            {
              icon: <Headphones size={36} />,
              title: "IT Consulting & Support",
              desc: "Expert IT consulting and support to ensure your technology runs smoothly.",
            },
          ].map((s, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl shadow-xl hover:-translate-y-2 transition text-center">
              <div className="text-green-500 mb-5 flex justify-center">
                {s.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW PROCESS SECTION */}
      <section className="workflow py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap mb-16">
            <div className="md:w-1/2 w-full">
              <div className="title-left">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 relative inline-block after:content-[''] after:absolute after:bottom-[-15px] after:left-0 after:w-20 after:h-1 after:bg-green-500 after:rounded-full pb-4">
                  Our Workflow <span className="text-[#0f3b2c]">Process</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowProcesses.map((process, idx) => (
              <div key={idx} className="process group text-center relative">
                <div className="img__container relative mb-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <img 
                      src={process.image} 
                      alt={process.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/400x300/0f3b2c/white?text=${process.number}+${process.name.split(' ')[0]}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">{process.number}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                      <i className={`${process.icon} text-green-600 text-lg`}></i>
                    </div>
                  </div>
                  
                  {idx < workflowProcesses.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-400 to-transparent">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <h5 className="process-name text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#0f3b2c] transition-colors">
                  {process.name}
                </h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="border-2 border-[#0f3b2c] text-[#0f3b2c] hover:bg-[#0f3b2c] hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 inline-flex items-center gap-2">
              Learn More About Our Process <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* SOLUTIONS CAROUSEL SECTION */}
      <section className="bg-green-50 py-24">
        <h2 className="text-4xl font-bold text-center mb-6">Powerful Software Solutions</h2>
        <p className="text-center text-gray-600 mb-16">
          Explore our suite of advanced software solutions designed to streamline your business processes.
        </p>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {carousels.map((carousel, i) => {
            const item = carousel[indexes[i]];
            return (
              <div key={i} className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                <img src={item.img} className="h-56 w-full object-cover" alt={item.title} />
                <div className="p-4 font-semibold text-center">{item.title}</div>
                <button
                  onClick={() => prev(i)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-green-500 hover:text-white transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => next(i)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-green-500 hover:text-white transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* TECHNOLOGIES CAROUSEL SECTION WITH LOGOS */}
      <section className="py-24 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap mb-12">
            <div className="md:w-1/2 w-full mb-4 md:mb-0">
              <div className="flex flex-col items-start">
                <h2 className="text-4xl font-bold text-[#0f3b2c] relative after:content-[''] after:absolute after:bottom-[-12px] after:left-0 after:w-16 after:h-1 after:bg-[#2c7a5e] after:rounded-full pb-4">
                  Technologies We Master
                </h2>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-x-auto pb-6 scroll-smooth hide-scrollbar">
              <div className="flex gap-6 w-max">
                {techItems.map((tech, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 text-center min-w-[170px] hover:-translate-y-2 transition-all duration-300 shadow-md border border-gray-100 group cursor-pointer"
                  >
                    <i 
                      className={`${tech.icon} text-5xl mb-4 block transition-all duration-300 group-hover:scale-110`}
                      style={{ color: tech.color }}
                    ></i>
                    <span className="block font-semibold text-gray-800 text-base">{tech.name}</span>
                    <span className="block text-xs text-gray-500 mt-2">{tech.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#f1f5f9] to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f1f5f9] to-transparent pointer-events-none"></div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              className="bg-white p-3 rounded-full shadow-md hover:bg-[#0f3b2c] hover:text-white transition-all duration-300"
              onClick={() => {
                const container = document.querySelector('.overflow-x-auto');
                if (container) container.scrollBy({ left: -250, behavior: 'smooth' });
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="bg-white p-3 rounded-full shadow-md hover:bg-[#0f3b2c] hover:text-white transition-all duration-300"
              onClick={() => {
                const container = document.querySelector('.overflow-x-auto');
                if (container) container.scrollBy({ left: 250, behavior: 'smooth' });
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              {techItems.length}+ technologies and frameworks at your disposal
            </p>
          </div>
        </div>
      </section>

      {/* WHY + CTA */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-8">Why Choose Us</h2>
          <ul className="space-y-6 text-gray-700">
            <li className="flex gap-3">
              <CheckCircle className="text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Expertise & Experience</h4>
                <p className="text-sm text-gray-600">
                  We bring years of industry experience to deliver powerful and reliable solutions.
                </p>
                <p className="text-sm text-gray-600">
                  Our team ensures every project meets the highest standards of quality and performance.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Client-Centric Approach</h4>
                <p className="text-sm text-gray-600">
                  Your business goals are at the center of everything we build.
                </p>
                <p className="text-sm text-gray-600">
                  We work closely with clients to create solutions tailored to their needs.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Cutting-Edge Technology</h4>
                <p className="text-sm text-gray-600">
                  We use the latest tools and frameworks to build fast and secure systems.
                </p>
                <p className="text-sm text-gray-600">
                  Our technology ensures your business stays ahead in a digital world.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div
          className="relative p-12 rounded-2xl shadow-xl bg-center bg-no-repeat bg-cover overflow-hidden"
          style={{
            backgroundImage: `url(${ctaBg})`,
            backgroundSize: "150%",
            backgroundPosition: "center center",
          }}
        >
          <div className="absolute inset-0 bg-green-900/70"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-green-100 mb-6">
              Partner with us for cutting-edge solutions that drive growth and innovation.
            </p>
            <button className="bg-green-500 hover:bg-green-600 transition px-6 py-3 font-semibold rounded-lg">
              Get a Free Quote
            </button>
          </div>
        </div>
      </section>

      {/* BLOG SECTION WITH READ MORE NAVIGATION */}
      <section className="bg-gray-100 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Latest Blog Posts</h2>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {blogPosts.map((post, i) => (
            <div key={i} className="bg-white rounded-xl shadow-xl overflow-hidden hover:-translate-y-2 transition cursor-pointer group">
              <img src={post.img} className="h-52 w-full object-cover group-hover:scale-105 transition duration-300" alt={post.title} />
              <div className="p-6">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {post.tag}
                </span>
                <h3 className="mt-4 font-semibold text-lg group-hover:text-[#0f3b2c] transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {post.excerpt}
                </p>
                <button 
                  onClick={handleReadMore}
                  className="mt-4 text-sm text-green-600 font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all duration-300"
                >
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Blog Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleReadMore}
            className="bg-[#0f3b2c] hover:bg-[#1a4d3a] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-xl"
          >
            View All Blog Posts <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* LEADERSHIP MESSAGE SECTION - UPDATED WITH PHOTO LEFT, TEXT RIGHT */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-stone-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 transition-all duration-300 hover:shadow-xl">
            {/* Top accent bar */}
            <div className="h-2 bg-gradient-to-r from-green-600 via-green-100 to-green-600"></div>
            
            <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-12">
              {/* Left Column - Chairperson Photo */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-full max-w-sm mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-red-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                    <img 
                      src={chairpersonPhoto} 
                      alt="Chairperson - Lhakpa Norbu Sherpa"
                      className="w-full h-auto rounded-xl object-cover aspect-[3/4]"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/600x800/2c3e50/white?text=Chairperson";
                      }}
                    />
                  </div>
                  {/* Optional decorative element */}
                  <div className="absolute -bottom-3 -right-3 bg-amber-100 rounded-full p-2 shadow-md">
                    <span className="text-2xl">⛰️</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-stone-800">Lhakpa Norbu Sherpa</h3>
                  <p className="text-amber-700 font-medium">Chairperson, Sherpa Sewa Kendra</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full"></span>
                  </div>
                </div>
              </div>

              {/* Right Column - Message */}
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full border border-amber-200">
                    <span className="text-amber-700 text-sm font-semibold tracking-wider">🏔️ LEADERSHIP MESSAGE</span>
                  </div>
                  <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-stone-800">
                    Message from Our Chairperson
                  </h2>
                  <div className="mt-2 w-16 h-1 bg-amber-500 rounded-full"></div>
                </div>

                <div className="space-y-5 text-stone-700 text-base sm:text-lg leading-relaxed">
                  <p>
                    Dear friends and members of the Sherpa community.
                  </p>
                  <p>
                    It is with great pride and humility that I address you as the Chairperson of Sherpa Sewa Kendra. 
                    Our organization stands as a testament to the strength, resilience, and unity of our community.
                  </p>
                  <p>
                    In today's rapidly changing world, we face both challenges and opportunities. 
                    Our mission remains clear: to preserve our rich cultural heritage while empowering our community 
                    through education, welfare, and sustainable development.
                  </p>
                  <p>
                    Together, we will continue to build a brighter future for the Sherpa community — one that honors 
                    our past, serves our present, and secures our future. I invite each of you to join us in this noble journey.
                  </p>
                  <p className="italic text-amber-700 border-l-4 border-amber-500 pl-4">
                    With warm regards and best wishes for our community's continued prosperity.
                  </p>
                </div>

                {/* Organization Motto */}
                <div className="mt-8 flex flex-wrap items-center gap-4 text-stone-400 text-sm">
                  <div className="flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-full">
                    <span className="text-base">🏔️</span>
                    <span>Preserving heritage · Empowering futures</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-400">
                    <span>Unity • Resilience • Service</span>
                    <span className="text-xs">Est. 2010</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}