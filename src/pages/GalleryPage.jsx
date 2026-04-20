
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useFetchDetail from "../hooks/useFetchDetail";
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';

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

export default function GalleryPage() {
  const { albumId } = useParams();
  const [selectedSubAlbum, setSelectedSubAlbum] = useState(null);
  const { data: album, loading, error } = useFetchDetail(`/albums/${albumId}/`);

  
  useEffect(() => {
  
    const setSafeTitle = (title) => {
      document.title = title;
      console.log("Title set to:", title); 
    };

    if (loading) {
      setSafeTitle("Loading Gallery - GorkhaSoft");
      return;
    }
    
    if (error || !album) {
      setSafeTitle("Album Not Found - GorkhaSoft");
      return;
    }
    

    const albumName = album.name || "Gallery";
    
    if (!selectedSubAlbum) {
      setSafeTitle(`${albumName} - Gallery - GorkhaSoft`);
      return;
    }
    
   
    const currentSubAlbum = album.subalbums?.find(sa => sa.id === selectedSubAlbum);
    if (currentSubAlbum && currentSubAlbum.name) {
      setSafeTitle(`${currentSubAlbum.name} - ${albumName} - GorkhaSoft`);
    } else {
      setSafeTitle(`${albumName} - Gallery - GorkhaSoft`);
    }
  }, [loading, error, album, selectedSubAlbum]);

  useEffect(() => {
    if (selectedSubAlbum && album?.subalbums) {
      const currentSubAlbum = album.subalbums.find(sa => sa.id === selectedSubAlbum);
      if (currentSubAlbum?.items?.length > 0) {
        setTimeout(() => {
          GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            zoomable: true,
            draggable: true,
          });
        }, 100);
      }
    }
  }, [selectedSubAlbum, album]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-4">
          <div className="text-6xl mb-4">😢</div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">Album Not Found</h3>
          <p className="text-red-600">{error || "The album you're looking for doesn't exist."}</p>
          <Link to="/gallery" className="mt-4 inline-block text-emerald-600 hover:text-emerald-700 font-semibold">
            ← Back to Albums
          </Link>
        </div>
      </div>
    );
  }

  
  if (!selectedSubAlbum) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-6">
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-2 text-emerald-200 hover:text-white transition-colors mb-6 group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to Albums
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {album.name}
            </motion.h1>
           
          </div>
        </section>

    
        <AnimSection className="max-w-7xl mx-auto px-6 py-20">
          {!album.subalbums || album.subalbums.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📁</div>
              <p className="text-gray-500 text-lg">No sub-albums found in this album.</p>
            </div>
          ) : (
            <motion.div 
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {album.subalbums.map((subalbum) => (
                <motion.div
                  key={subalbum.id}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedSubAlbum(subalbum.id)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                      {subalbum.items && subalbum.items[0] ? (
                        <img
                          src={subalbum.items[0].image}
                          alt={subalbum.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          📷
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          View {subalbum.items?.length || 0} Photos →
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                        {subalbum.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {subalbum.items?.length || 0} photo{subalbum.items?.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimSection>
      </div>
    );
  }

  const currentSubAlbum = album.subalbums?.find(sa => sa.id === selectedSubAlbum);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 text-white py-15 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <button
            onClick={() => setSelectedSubAlbum(null)}
            className="inline-flex items-center gap-2 text-emerald-200 hover:text-white transition-colors mb-6 group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to Sub-Albums
          </button>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {album.name}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-emerald-100"
          >
            {currentSubAlbum?.name}
          </motion.h2>
          
        </div>
      </section>

      {/* Images Grid */}
      <AnimSection className="max-w-7xl mx-auto px-6 py-15">
        {!currentSubAlbum?.items || currentSubAlbum.items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-gray-500 text-lg">No images found in this sub-album.</p>
          </div>
        ) : (
          <motion.div 
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentSubAlbum.items.map((item, index) => (
              <motion.div
                key={item.id || index}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <a
                  href={item.image}
                  className="glightbox block"
                  data-gallery={`gallery-${selectedSubAlbum}`}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                    <img
                      src={item.image}
                      alt={item.caption || `${currentSubAlbum.name} - ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-white text-sm font-semibold bg-emerald-500/90 px-3 py-1 rounded-full inline-block">
                        🔍 View Fullscreen
                      </span>
                    </div>
                  </div>
                </a>
                {item.caption && (
                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-600 line-clamp-2">{item.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimSection>
    </div>
  );
}