import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";


function truncateWords(text, maxWords = 20) {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    document.title = "Portfolio - GorkhaSoft";
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await API.get("portfolio/");
      const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
      setProjects(data);

      const allCategories = data.flatMap((item) =>
        item.categories?.map((c) => c.name) || []
      );
      setCategories(["All", ...new Set(allCategories)]);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) =>
          p.categories?.some((c) => c.name === activeCategory)
        );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-20">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">


      <section className="bg-gradient-to-r from-[#0f3b2c] to-[#1a5d4a] text-white py-20 text-center">
        <h1 className="text-5xl font-bold">My Portfolio</h1>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">

  
        <div className="flex justify-center mb-10">
          <LayoutGroup>
            <div className="relative flex gap-2 bg-gray-200 p-2 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-5 py-2 rounded-lg z-10 text-sm font-medium transition-colors duration-200"
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-green-500 rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative transition-colors duration-200 ${
                      activeCategory === cat ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        {/* GRID */}
        <motion.div layout className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                style={{ height: "380px" }}  // fixed card height
              >
                {/* Image — fixed height */}
                <div className="h-48 w-full flex-shrink-0 bg-gray-100 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                      🖼
                    </div>
                  )}
                </div>

             
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-lg font-bold mb-1 line-clamp-1">
                    {project.title}
                  </h2>

                  
                  <p className="text-sm text-gray-500 flex-1">
                    {truncateWords(project.description, 10)}
                  </p>

              
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.categories?.map((cat, i) => (
                      <span
                        key={i}
                        className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>

               
                  <button
                    onClick={() => navigate(`/portfolio/${project.slug}`)}
                    className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-[#0f3b2c] to-[#1a5d4a] text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150"
                  >
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}