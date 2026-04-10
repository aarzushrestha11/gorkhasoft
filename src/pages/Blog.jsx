import React, { useEffect, useState } from "react";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API from "../api/axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("blogs/");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.results || [];

      setBlogs(data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-gray-800">
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#0f3b2c] to-[#1a5d4a] text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Our Blog</h1>
        <p className="mt-3 text-green-100">
          Insights, thoughts, and industry trends
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-16 max-w-6xl mx-auto px-6">

        {/* DETAIL VIEW */}
        {selectedBlog ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <button
              onClick={() => setSelectedBlog(null)}
              className="mb-6 text-green-700 font-semibold"
            >
              ← Back to Blogs
            </button>

            {selectedBlog.photo && (
              <img
                src={selectedBlog.photo}
                alt={selectedBlog.subject}
                className="w-full h-80 object-cover rounded-xl mb-6"
              />
            )}

            <div className="flex gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {selectedBlog.created_at}
              </span>

              <span className="flex items-center gap-1">
                <User size={14} />
                Admin
              </span>

              <span className="flex items-center gap-1">
                <Tag size={14} />
                Blog
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-4">
              {selectedBlog.subject}
            </h1>

            <p className="text-gray-700 leading-relaxed text-base">
              {selectedBlog.detail}
            </p>
          </div>
        ) : (
          /* LIST VIEW */
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
                onClick={() => setSelectedBlog(post)}
              >
                {post.photo && (
                  <img
                    src={post.photo}
                    alt={post.subject}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-6">
                  <div className="flex gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.created_at}
                    </span>

                    <span className="flex items-center gap-1">
                      <User size={14} />
                      Admin
                    </span>

                    <span className="flex items-center gap-1">
                      <Tag size={14} />
                      Blog
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-3">
                    {post.subject}
                  </h2>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.detail}
                  </p>

                  <div className="mt-5 text-green-700 font-semibold flex items-center gap-2">
                    Read More <ArrowRight size={16} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Blog;