
import React, { useRef, useEffect } from "react";
//eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import Code from "lucide-react/dist/esm/icons/code";
import Globe from "lucide-react/dist/esm/icons/globe";
import Smartphone from "lucide-react/dist/esm/icons/smartphone";
import Cloud from "lucide-react/dist/esm/icons/cloud";
import Shield from "lucide-react/dist/esm/icons/shield";
import Database from "lucide-react/dist/esm/icons/database";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import CheckCircle from "lucide-react/dist/esm/icons/check-circle";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

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

function SectionHeading({ title, accent, subtitle }) {
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
      <motion.h2 variants={fadeUp} className="text-4xl font-extrabold">
        {title} <span className="text-emerald-600">{accent}</span>
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="text-gray-500 mt-3 max-w-xl mx-auto text-sm"
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

const services = [
  {
    icon: <Code size={36} />,
    title: "Custom Software Solutions",
    desc: "Scalable software tailored to your business workflows and goals.",
    points: ["Enterprise apps", "Automation systems", "Custom dashboards"],
  },
  {
    icon: <Globe size={36} />,
    title: "Web Engineering",
    desc: "High-performance websites and web applications.",
    points: ["React / Next.js", "SEO optimized", "Fast UI/UX"],
  },
  {
    icon: <Smartphone size={36} />,
    title: "Mobile Applications",
    desc: "Cross-platform mobile apps for Android & iOS.",
    points: ["Flutter / React Native", "Clean UI design", "App deployment"],
  },
  {
    icon: <Cloud size={36} />,
    title: "Cloud & DevOps",
    desc: "Deploy and scale infrastructure efficiently.",
    points: ["AWS / Azure", "CI/CD pipelines", "Docker containers"],
  },
  {
    icon: <Shield size={36} />,
    title: "Security & Protection",
    desc: "Protect your systems with modern security practices.",
    points: ["Security audits", "Data protection", "Pen testing"],
  },
  {
    icon: <Database size={36} />,
    title: "Data & Analytics",
    desc: "Turn raw data into actionable insights.",
    points: ["Dashboards", "Visualization", "BI solutions"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    desc: "Understanding your goals and requirements.",
  },
  {
    step: "02",
    title: "Planning",
    desc: "Defining architecture and roadmap.",
  },
  {
    step: "03",
    title: "Development",
    desc: "Building scalable and clean solutions.",
  },
  {
    step: "04",
    title: "Launch",
    desc: "Testing, deployment, and support.",
  },
];


export default function Services() {
 
  useEffect(() => {
    document.title = "Services - GorkhaSoft";
  }, []);

  return (
    <div className="bg-slate-50 text-gray-800">


      <section className="bg-gradient-to-r from-[#0f3b2c] to-emerald-600 text-white py-24 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.1)}
          className="max-w-3xl mx-auto px-6"
        >
          <motion.h1 variants={fadeUp} className="text-5xl font-bold">
            Our Services
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 text-emerald-100">
            Innovative, scalable, and reliable digital solutions for modern businesses.
          </motion.p>
        </motion.div>
      </section>

   
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionHeading
          title="What We"
          accent="Offer"
          subtitle="End-to-end digital services built for performance and growth"
        />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:border-emerald-200 transition"
            >
              <div className="text-emerald-600 mb-4">{s.icon}</div>

              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-600 mb-4">{s.desc}</p>

              <ul className="space-y-2">
                {s.points.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-emerald-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

    
      <section className="py-24 bg-white">
        <SectionHeading
          title="Our Working"
          accent="Process"
          subtitle="A structured approach to delivering high-quality solutions"
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6"
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center p-6 border rounded-xl hover:shadow-lg transition"
            >
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {step.step}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-24 bg-emerald-50">
        <AnimSection>
          <div className="max-w-3xl mx-auto text-center bg-white p-10 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-3">
              Let's Build Something Great
            </h3>
            <p className="text-gray-600 mb-6">
              Have an idea? We'll turn it into a powerful digital product.
            </p>

            <button className="bg-[#0f3b2c] text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 hover:bg-emerald-700 transition">
              Get Started <ArrowRight size={18} />
            </button>
          </div>
        </AnimSection>
      </section>

    </div>
  );
}