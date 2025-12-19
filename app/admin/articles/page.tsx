"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  FileText,
  Calendar,
  Tag,
  User,
  Star,
  Clock,
  Upload,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import TipTap to avoid SSR issues
const TipTapEditor = dynamic(
  () => import("@/app/components/admin/TipTapEditor"),
  { ssr: false, loading: () => <div className="h-[400px] bg-[#1a1a1a] rounded-xl animate-pulse" /> }
);

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string | null;
  author: string;
  authorImage: string | null;
  readTime: string | null;
  featured: boolean;
  status: string;
  publishedAt: string | null;
  views: number;
  createdAt: string;
}

const categories = [
  "Architecture",
  "Interior Design",
  "Urban Planning",
  "Sustainability",
  "Technology",
  "News",
  "Case Study",
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "Architecture",
    tags: "",
    author: "Wearch Studio",
    authorImage: "",
    featured: false,
    status: "Draft",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingArticle
        ? `/api/articles/${editingArticle.id}`
        : "/api/articles";
      const method = editingArticle ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchArticles();
        closeModal();
      }
    } catch (error) {
      console.error("Failed to save article:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchArticles();
      }
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };

  const openModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        excerpt: article.excerpt || "",
        content: article.content,
        coverImage: article.coverImage || "",
        category: article.category,
        tags: article.tags || "",
        author: article.author,
        authorImage: article.authorImage || "",
        featured: article.featured,
        status: article.status,
      });
    } else {
      setEditingArticle(null);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "Architecture",
        tags: "",
        author: "Wearch Studio",
        authorImage: "",
        featured: false,
        status: "Draft",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverImage" | "authorImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("folder", "articles");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, [field]: data.url }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || article.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || article.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "Published").length,
    draft: articles.filter((a) => a.status === "Draft").length,
    featured: articles.filter((a) => a.featured).length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Articles</h1>
          <p className="text-white/60 mt-1">
            Manage your blog posts and articles
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 bg-[#BBFF00] text-[#242222] rounded-xl font-semibold"
        >
          <Plus size={20} />
          New Article
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total", value: stats.total, icon: FileText },
          { label: "Published", value: stats.published, icon: Eye },
          { label: "Drafts", value: stats.draft, icon: Edit2 },
          { label: "Featured", value: stats.featured, icon: Star },
          { label: "Total Views", value: stats.totalViews, icon: BarChart3 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#242222] rounded-xl p-4 border border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#BBFF00]/10 rounded-lg flex items-center justify-center">
                <stat.icon size={20} className="text-[#BBFF00]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#242222] border border-white/10 text-white placeholder-white/30 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-[#242222] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50"
        >
          <option value="all">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-[#242222] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-[#242222] rounded-xl h-80 animate-pulse"
            />
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-[#242222] rounded-xl p-12 text-center">
          <FileText size={48} className="text-white/20 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">
            No articles found
          </h3>
          <p className="text-white/40 mb-6">
            {searchQuery || filterStatus !== "all" || filterCategory !== "all"
              ? "Try adjusting your filters"
              : "Get started by creating your first article"}
          </p>
          {!searchQuery &&
            filterStatus === "all" &&
            filterCategory === "all" && (
              <button
                onClick={() => openModal()}
                className="px-6 py-3 bg-[#BBFF00] text-[#242222] rounded-xl font-semibold"
              >
                Create Article
              </button>
            )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#242222] rounded-xl overflow-hidden border border-white/5 group"
            >
              {/* Cover Image */}
              <div className="relative h-48 bg-[#1a1a1a]">
                {article.coverImage ? (
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText size={48} className="text-white/10" />
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      article.status === "Published"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {article.status}
                  </span>
                  {article.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#BBFF00]/20 text-[#BBFF00]">
                      Featured
                    </span>
                  )}
                </div>
                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openModal(article)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                  >
                    <Edit2 size={18} />
                  </motion.button>
                  <motion.a
                    href={`/articles/${article.slug}`}
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(article.id)}
                    className="w-10 h-10 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center text-red-400"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-[#BBFF00]/10 text-[#BBFF00] text-xs rounded-md">
                    {article.category}
                  </span>
                  {article.readTime && (
                    <span className="text-white/40 text-xs flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-white/50 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-white/40 text-xs">
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {article.views} views
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Article Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto py-8"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-[#1a1a1a] rounded-2xl m-4"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">
                  {editingArticle ? "Edit Article" : "New Article"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white/60 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-[#242222] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50 text-lg"
                    placeholder="Enter article title..."
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Cover Image
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={formData.coverImage}
                        onChange={(e) =>
                          setFormData({ ...formData, coverImage: e.target.value })
                        }
                        className="w-full bg-[#242222] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50"
                        placeholder="Image URL or upload..."
                      />
                    </div>
                    <label className="px-4 py-3 bg-[#242222] border border-white/10 rounded-xl cursor-pointer hover:border-[#BBFF00]/50 transition-colors flex items-center gap-2 text-white/60">
                      <Upload size={18} />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, "coverImage")}
                      />
                    </label>
                  </div>
                  {formData.coverImage && (
                    <div className="mt-3 relative">
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, coverImage: "" })
                        }
                        className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={2}
                    className="w-full bg-[#242222] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50 resize-none"
                    placeholder="Brief description of the article..."
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    Content *
                  </label>
                  <TipTapEditor
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                  />
                </div>

                {/* Category & Tags */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      <Tag size={14} className="inline mr-1" />
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-[#242222] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      <Tag size={14} className="inline mr-1" />
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full bg-[#242222] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50"
                      placeholder="design, architecture, modern..."
                    />
                  </div>
                </div>

                {/* Author */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      <User size={14} className="inline mr-1" />
                      Author
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full bg-[#242222] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50"
                      placeholder="Author name..."
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Author Image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={formData.authorImage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            authorImage: e.target.value,
                          })
                        }
                        className="flex-1 bg-[#242222] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50"
                        placeholder="Author image URL..."
                      />
                      <label className="px-4 py-3 bg-[#242222] border border-white/10 rounded-xl cursor-pointer hover:border-[#BBFF00]/50">
                        <Upload size={18} className="text-white/60" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, "authorImage")}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Status & Featured */}
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="bg-[#242222] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#BBFF00]/50"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer mt-6">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition-colors ${
                        formData.featured ? "bg-[#BBFF00]" : "bg-white/10"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transition-transform mt-0.5 ${
                          formData.featured
                            ? "translate-x-6"
                            : "translate-x-0.5"
                        }`}
                      />
                    </div>
                    <span className="text-white/60 flex items-center gap-2">
                      <Star size={16} />
                      Featured Article
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 text-white/60 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-[#BBFF00] text-[#242222] rounded-xl font-semibold disabled:opacity-50"
                  >
                    {saving
                      ? "Saving..."
                      : editingArticle
                      ? "Update Article"
                      : "Publish Article"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}