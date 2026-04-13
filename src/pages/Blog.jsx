import React, { useEffect, useState } from "react";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function formatDate(str) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-US", {
    month: "short", day: "2-digit", year: "numeric",
  });
}

function truncateWords(text, max = 25) {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  return words.length <= max ? text : words.slice(0, max).join(" ") + "…";
}

const Blog = () => {
  const navigate = useNavigate();
  const [blogs,   setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res  = await API.get("blogs/");
      const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
      setBlogs(data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
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

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#0f3b2c] to-[#1a5d4a] text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Our Blog</h1>
        <p className="mt-3 text-green-100">Insights, thoughts, and industry trends</p>
      </section>

      {/* CONTENT */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">No blog posts found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
              >
                {/* Photo field per Blog.jsx */}
                {post.photo && (
                  <div className="overflow-hidden h-56 flex-shrink-0">
                    <img
                      src={post.photo}
                      alt={post.subject}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://placehold.co/800x400/1a5d4a/white?text=Blog"; }}
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Meta row */}
                  <div className="flex gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(post.created_at)}
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

                  {/* subject = title */}
                  <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.subject}</h2>

                  {/* detail = body — truncated preview */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {truncateWords(post.detail, 30)}
                  </p>

                  {/* Read More button */}
                  <button
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="mt-5 self-start inline-flex items-center gap-2 bg-gradient-to-r from-[#0f3b2c] to-[#1a5d4a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-150"
                  >
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Blog;