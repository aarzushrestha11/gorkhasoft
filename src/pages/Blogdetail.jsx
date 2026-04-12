import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API from "../api/axios";

function formatDate(str) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

export default function BlogDetail() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const [post,     setPost]    = useState(null);
  const [loading,  setLoading] = useState(true);
  const [error,    setError]   = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch single blog by slug: /api/blogs/<slug>/
        const res = await API.get(`blogs/${slug}/`);
        setPost(res.data);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Blog post not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-lg">{error || "Post not found."}</p>
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm border border-green-300 px-5 py-2 rounded-full hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
        >
          <ArrowLeft size={16} /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-gray-800 min-h-screen">
      <Navbar />

      {/* HERO — cover image or gradient fallback */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden bg-gradient-to-r from-[#0f3b2c] to-[#1a5d4a]">
        {post.photo && (
          <img
            src={post.photo}
            alt={post.subject}
            className="w-full h-full object-cover opacity-60"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
          <span className="text-xs uppercase tracking-widest bg-green-500 px-3 py-1 rounded-full mb-4 font-semibold">
            Blog
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold max-w-3xl leading-tight drop-shadow">
            {post.subject}
          </h1>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <article className="max-w-3xl mx-auto px-6 py-14">

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
          <span className="flex items-center gap-1.5">
            <Calendar size={15} className="text-green-600" />
            {formatDate(post.created_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={15} className="text-green-600" />
            Admin
          </span>
          <span className="flex items-center gap-1.5">
            <Tag size={15} className="text-green-600" />
            Blog
          </span>
        </div>

        {/* Full body — "detail" field per Blog.jsx */}
        <div className="prose prose-lg prose-green max-w-none text-gray-700 leading-relaxed">
          {/* Split on newlines so paragraphs render correctly */}
          {post.detail
            ? post.detail.split(/\n\n+/).map((para, i) => (
                <p key={i} className="mb-5 text-gray-700 text-base leading-relaxed">
                  {para.replace(/\n/g, " ")}
                </p>
              ))
            : <p className="text-gray-400 italic">No content available.</p>
          }
        </div>

        {/* Back button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm border border-green-300 px-6 py-2.5 rounded-full hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
          >
            <ArrowLeft size={16} /> Back to Blog
          </button>
        </div>
      </article>

      <Footer />
    </div>
  );
}