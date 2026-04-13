//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function PortfolioCard({ project, index }) {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5, boxShadow: "0 24px 48px -12px rgba(0,0,0,0.14)" }}
      className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden bg-gray-50">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-base leading-snug mb-2">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        <button
          onClick={() => navigate(`/portfolio/${project.slug}`)}
          className="group mt-4 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm font-semibold rounded-xl inline-flex items-center justify-center gap-2 transition-colors duration-200"
        >
          View Project
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>
    </motion.article>
  );
}