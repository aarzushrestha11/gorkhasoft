import React from "react";
import LazyImage from "./LazyLoading";
import chairpersonPhoto from "../assets/chairperson.webp";

export default function ChairmanSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-gradient-to-br from-[#071a10] to-[#0f3b24] rounded-3xl overflow-hidden shadow-xl">
          
          <div className="grid md:grid-cols-2">

            {/* LEFT SIDE (IMAGE) */}
            <div className="flex flex-col items-center justify-center p-10 border-b md:border-b-0 md:border-r border-white/10">

              <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg border border-emerald-400/20">
                <LazyImage
                  src={chairpersonPhoto}
                  alt="Chairperson"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white">
                  Biswo Shrestha
                </h3>
                <p className="text-emerald-400 text-sm mt-1">
                  Chairperson, GorkhaSoft
                </p>
              </div>
            </div>

            {/* RIGHT SIDE (TEXT) */}
            <div className="p-10 flex flex-col justify-center">

              <div className="text-emerald-300 text-xs font-semibold mb-3">
                🏔️ Leadership Message
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Message from Our Chairperson
              </h2>

              <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>Dear clients and partners,</p>

                <p>
                  At GorkhaSoft, we believe in delivering high-quality digital
                  solutions that empower businesses to grow and succeed.
                </p>

                <p>
                  Our team is committed to innovation, reliability, and
                  long-term partnerships that create real value.
                </p>

                <p className="italic text-emerald-300 border-l-2 border-emerald-500 pl-3">
                  Thank you for trusting us in your journey.
                </p>
              </div>

              <div className="mt-6 text-xs text-gray-400">
                Innovation · Quality · Growth
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}