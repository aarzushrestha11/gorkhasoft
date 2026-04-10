import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);

      const res = await API.get("portfolio/");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.results || [];

      setProjects(data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-gray-500">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#0f3b2c] to-[#1a5d4a] text-white py-20 text-center">
        <h1 className="text-5xl font-bold">My Portfolio</h1>
        <p className="mt-3 text-green-100">
          A collection of my creative work & projects
        </p>
      </section>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* DETAIL VIEW */}
        {selectedProject ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <button
              onClick={() => setSelectedProject(null)}
              className="text-green-700 font-semibold mb-6"
            >
              ← Back to Portfolio
            </button>

            {selectedProject.image && (
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-96 object-cover rounded-xl mb-6"
              />
            )}

            <h1 className="text-3xl font-bold mb-4">
              {selectedProject.title}
            </h1>

            <p className="text-gray-700 leading-relaxed">
              {selectedProject.description}
            </p>

          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid md:grid-cols-3 gap-8">

            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition hover:-translate-y-1"
              >

                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6">

                  <h2 className="text-xl font-bold mb-2">
                    {project.title || "Untitled Project"}
                  </h2>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {project.description || "No description available."}
                  </p>

                  {/* READ MORE BUTTON */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="mt-5 text-green-700 font-semibold hover:underline"
                  >
                    Read More →
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}