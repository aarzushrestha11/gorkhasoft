import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import { motion } from "framer-motion";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await API.get(`portfolio/${slug}/`);
        setProject(res.data);
        setError(null);
      } catch (err) {
        console.error("PortfolioDetail fetch failed:", err);
        setError("Project not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg mb-4">{error || "Project not found."}</p>
        <Link to="/portfolio" className="text-green-700 underline text-sm">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Breadcrumb bar — solid bg so it's always visible */}
      <div className="w-full bg-gray-100 border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-gray-500 hover:text-green-700 transition-colors whitespace-nowrap"
          >
            Home
          </Link>

          <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>

          <Link
            to="/portfolio"
            className="text-gray-500 hover:text-green-700 transition-colors whitespace-nowrap"
          >
            Portfolio
          </Link>

          <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>

          <span className="text-green-700 font-semibold truncate">
            {project.title}
          </span>
        </div>
      </div>

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-4xl mx-auto px-6 py-12"
      >
        {project.image && (
          <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold text-gray-900 mb-3">{project.title}</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.categories?.map((cat, i) => (
            <span
              key={i}
              className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium"
            >
              {cat.name}
            </span>
          ))}
        </div>

        <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
          {project.description}
        </p>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block px-6 py-3 bg-gradient-to-r from-[#0f3b2c] to-[#1a5d4a] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            View Live Project →
          </a>
        )}
      </motion.div>
    </div>
  );
}