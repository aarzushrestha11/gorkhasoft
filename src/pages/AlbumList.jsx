
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

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

export default function AlbumList() {
  const { data: albums, loading, error } = useFetch("/albums/");


  useEffect(() => {
    if (loading) {
      document.title = "Loading Gallery - GorkhaSoft";
    } else if (error) {
      document.title = "Gallery Error - GorkhaSoft";
    } else {
      document.title = "Gallery - GorkhaSoft";
    }
  }, [loading, error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing albums...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-4">
          <div className="text-6xl mb-4">😢</div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent"
          >
            Our Photo Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-emerald-100 max-w-2xl mx-auto"
          >
            Capturing moments, creating memories that last forever
          </motion.p>
        </div>
      </section>

      {/* Albums Grid */}
      <AnimSection className="max-w-7xl mx-auto px-6 py-20">
        {!albums || albums.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-500 text-lg">No albums found. Check back soon!</p>
          </div>
        ) : (
          <motion.div 
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {albums.map((album, index) => (
              <motion.div
                key={album.id}
                variants={fadeUp}
                custom={index}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={`/gallery/${album.id}`}
                  className="group block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                    {album.cover_image ? (
                      <img
                        src={album.cover_image}
                        alt={album.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        🖼️
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-white text-sm font-semibold bg-emerald-500/90 px-3 py-1 rounded-full inline-block">
                        View Album →
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                      {album.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {album.subalbums?.length || 0} sub-album{album.subalbums?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimSection>
    </div>
  );
}