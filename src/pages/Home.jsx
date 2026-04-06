import React, { useState } from "react";
import {
  Code,
  Globe,
  Headphones,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ctaBg from "../assets/cta-bg.png";   // use any green wave image
import Navbar from "../Components/Navbar"
import heroBg from "../assets/hero-bg.png";
import solution1 from "../assets/solution1.webp";
import solution2 from "../assets/solution2.png";
import solution3 from "../assets/solution3.png";
import solution from "../assets/solution.jpg";
import solution5 from "../assets/solution5.jpg";
import solution6 from "../assets/solution6.png";
import whyImg from "../assets/whyImg.png";
import blog1 from "../assets/blog1.avif";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";
import Footer from "../Components/Footer";
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

export default function Home() {
  const [indexes, setIndexes] = useState([0, 0, 0]);

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

  return (
    <div className="bg-slate-50 text-gray-800">
<Navbar/>
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

      {/* SERVICES */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">Our Services</h2>
       

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

      {/* SOLUTIONS */}
      <section className="bg-green-50 py-24">
        <h2 className="text-4xl font-bold text-center mb-6">
          Powerful Software Solutions
        </h2>
        <p className="text-center text-gray-600 mb-16">
          Explore our suite of advanced software solutions designed to streamline your business processes.
        </p>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {carousels.map((carousel, i) => {
            const item = carousel[indexes[i]];
            return (
              <div key={i} className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                <img src={item.img} className="h-56 w-full object-cover" />
                <div className="p-4 font-semibold text-center">{item.title}</div>

                <button onClick={() => prev(i)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-green-500 hover:text-white">
                  <ChevronLeft />
                </button>

                <button onClick={() => next(i)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-green-500 hover:text-white">
                  <ChevronRight />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY + CTA */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
    <div>
  <h2 className="text-4xl font-bold mb-8">Why Choose Us</h2>

  <ul className="space-y-6 text-gray-700">
    
    {/* Expertise & Experience */}
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

    {/* Client-Centric Approach */}
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

    {/* Cutting-Edge Technology */}
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
    backgroundSize: "150%", // zooms in the image
    backgroundPosition: "center center", // keeps it centered
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-green-900/70"></div>

  {/* Content */}
  <div className="relative z-10 text-white">
    <h3 className="text-2xl font-bold mb-4">
      Ready to Transform Your Business?
    </h3>
    <p className="text-green-100 mb-6">
      Partner with us for cutting-edge solutions that drive growth and innovation.
    </p>
    <button className="bg-green-500 hover:bg-green-600 transition px-6 py-3 font-semibold">
      Get a Free Quote
    </button>
  </div>
</div>


      </section>

      {/* BLOG */}
      <section className="bg-gray-100 py-24 shadow-xl hover:-translate-y-2 transition">
        <h2 className="text-4xl font-bold text-center mb-16">Latest Blog Posts</h2>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            {
              img: blog1,
              tag: "Technology",
              title: "Top 5 Trends in Software Development for 2024",
            },
            {
              img: blog2,
              tag: "Cloud",
              title: "How Cloud Computing Can Benefit Your Business",
            },
            {
              img: blog3,
              tag: "AI",
              title: "Announcing Our New Process Management Tool",
            },
          ].map((b, i) => (
            <div key={i} className="bg-white rounded-xl shadow-xl overflow-hidden">
              <img src={b.img} className="h-52 w-full object-cover" />
              <div className="p-6">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {b.tag}
                </span>
                <h3 className="mt-4 font-semibold">{b.title}</h3>
                <p className="mt-3 text-sm text-green-600 font-semibold">Read More →</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>

    </div>
  );
}
