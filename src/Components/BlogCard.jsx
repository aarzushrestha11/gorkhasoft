//eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import LazyImage from "./LazyLoading";
import Blog from "../pages/Blog";

export default function BlogCard({ post, index }) {
  const navigate = useNavigate();

  return (
      <article
      className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col
                 opacity-0 animate-fadeUp hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
    >
      <div className="h-48 overflow-hidden bg-gray-50">
        <LazyImage
          src={post.photo}
          alt={post.subject}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-bold text-gray-800 text-base leading-snug mb-2 line-clamp-2">
          {post.subject}
        </h4>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
          {post.detail}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          {post.created_at && (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar size={12} />
              {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
            </span>
          )}
          <span  onClick={() => navigate(`/blog/${Blog.slug}`)} className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 ml-auto group">
            Read more
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </span>
        </div>
      </div>
    </article>
  );
}