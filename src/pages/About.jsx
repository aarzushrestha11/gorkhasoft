import { CheckCircle, Users, Rocket, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="bg-slate-50 text-gray-800">

      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-r from-green-900 to-green-600">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4">About GorkhaSoft</h1>
          <p className="text-green-100 max-w-2xl mx-auto">
            We build innovative digital solutions that help businesses grow,
            scale, and succeed in a fast-moving world.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
          <p className="text-gray-600 mb-4">
            TechNova is a technology-driven company focused on delivering
            high-quality digital products for startups, enterprises, and growing
            businesses.
          </p>
          <p className="text-gray-600">
            Our expert team combines creativity, strategy, and cutting-edge
            technology to build software that solves real-world problems and
            drives measurable results.
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-xl">
          <ul className="space-y-6">
            <li className="flex gap-4">
              <CheckCircle className="text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold">Trusted Experts</h4>
                <p className="text-sm text-gray-600">
                  Years of experience delivering scalable digital solutions.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle className="text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold">Client-Focused</h4>
                <p className="text-sm text-gray-600">
                  Every project is tailored to your business goals.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <CheckCircle className="text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold">Future-Ready Tech</h4>
                <p className="text-sm text-gray-600">
                  We use modern, secure, and high-performance technologies.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">
          {[
            { icon: <Users size={40} />, title: "500+ Clients" },
            { icon: <Rocket size={40} />, title: "200+ Projects" },
            { icon: <Shield size={40} />, title: "Secure Systems" },
            { icon: <Users size={40} />, title: "Expert Team" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-4"
            >
              <div className="text-green-500">{s.icon}</div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-green-900 to-green-600 text-center text-white px-6">
        <h2 className="text-4xl font-bold mb-6">
          Let’s Build Something Amazing Together
        </h2>
        <p className="text-green-100 max-w-2xl mx-auto mb-8">
          Partner with TechNova to create innovative, scalable, and powerful
          digital solutions for your business.
        </p>
        <button className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-semibold shadow-xl transition">
          Get a Free Quote
        </button>
      </section>

    </div>
  );
}
