import React from "react";
import {
  Code,
  Globe,
  Smartphone,
  Cloud,
  Shield,
  Database,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const services = [
  {
    icon: <Code size={40} />,
    title: "Custom Software Solutions",
    desc: "We design and develop scalable software tailored to your business workflows and goals.",
    points: [
      "Enterprise-grade applications",
      "Automation systems",
      "Custom dashboards & tools",
    ],
  },
  {
    icon: <Globe size={40} />,
    title: "Web Engineering",
    desc: "High-performance websites and web apps built with modern frameworks.",
    points: [
      "React / Next.js development",
      "SEO optimized architecture",
      "Fast & responsive UI",
    ],
  },
  {
    icon: <Smartphone size={40} />,
    title: "Mobile Applications",
    desc: "Beautiful and powerful mobile apps for Android and iOS platforms.",
    points: [
      "Cross-platform apps",
      "UI/UX focused design",
      "App store deployment",
    ],
  },
  {
    icon: <Cloud size={40} />,
    title: "Cloud & DevOps",
    desc: "Deploy, scale, and manage your infrastructure efficiently.",
    points: [
      "AWS / Azure deployment",
      "CI/CD pipelines",
      "Docker & containerization",
    ],
  },
  {
    icon: <Shield size={40} />,
    title: "Security & Protection",
    desc: "Protect your systems with industry-standard security practices.",
    points: [
      "Security audits",
      "Data protection",
      "Vulnerability testing",
    ],
  },
  {
    icon: <Database size={40} />,
    title: "Data & Analytics",
    desc: "Transform raw data into meaningful insights for decision making.",
    points: [
      "Dashboards & reporting",
      "Data visualization",
      "Business intelligence",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    desc: "We understand your business goals, requirements, and challenges.",
  },
  {
    step: "02",
    title: "Planning",
    desc: "We design a roadmap and choose the right technologies.",
  },
  {
    step: "03",
    title: "Development",
    desc: "Our team builds your solution with clean and scalable code.",
  },
  {
    step: "04",
    title: "Launch",
    desc: "We deploy, test, and support your product post-launch.",
  },
];

export default function Services() {
  return (
    <div className="bg-slate-50 text-gray-800">
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#0f3b2c] to-green-600 text-white py-24 text-center">
        <h1 className="text-5xl font-bold">Our Expertise & Services</h1>
        <p className="mt-4 text-green-100 max-w-2xl mx-auto">
          We deliver innovative, scalable, and reliable digital solutions that
          empower businesses to grow and succeed in a competitive world.
        </p>
      </section>

      {/* SERVICES DETAIL SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="space-y-16">
          {services.map((service, i) => (
            <div
              key={i}
              className="grid md:grid-cols-2 gap-10 items-center bg-white p-10 rounded-2xl shadow-md"
            >
              <div>
                <div className="text-green-600 mb-4">{service.icon}</div>
                <h2 className="text-2xl font-bold mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4">{service.desc}</p>

                <ul className="space-y-2">
                  {service.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 h-56 rounded-xl flex items-center justify-center text-green-700 font-semibold">
                Service Illustration
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Working Process
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {processSteps.map((step, i) => (
            <div
              key={i}
              className="text-center p-6 border rounded-xl hover:shadow-lg transition"
            >
              <div className="text-3xl font-bold text-green-600 mb-2">
                {step.step}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-green-50 ">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
         

          <div className="bg-white p-10 rounded-2xl shadow-md text-center">
            <h3 className="text-2xl font-bold mb-4">
              Let's Build Something Great
            </h3>
            <p className="text-gray-600 mb-6">
              Have an idea? We can turn it into reality with the right technology and strategy.
            </p>
            <button className="bg-[#0f3b2c] text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto">
              Get Started <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

     

      <Footer />
    </div>
  );
}