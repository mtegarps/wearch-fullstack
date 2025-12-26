"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  User,
  ChevronLeft,
  Filter,
  Star,
  Eye,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string;
  tags: string | null;
  author: string;
  authorImage: string | null;
  readTime: string | null;
  featured: boolean;
  publishedAt: string | null;
  views: number;
}

interface Settings {
  siteName: string;
  primaryColor: string;
  darkBg: string;
  lightBg: string;
  logoUrl: string;
}

const categories = [
  "All",
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
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [articlesRes, settingsRes] = await Promise.all([
        fetch("/api/articles?status=Published"),
        fetch("/api/settings"),
      ]);

      const articlesData = await articlesRes.json();
      const settingsData = await settingsRes.json();

      setArticles(articlesData);
      setFeaturedArticles(articlesData.filter((a: Article) => a.featured));
      setSettings(settingsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#242222] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-[#BBFF00] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#242222]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#242222]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="text-sm">Back to Home</span>
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <span className="text-white font-semibold">
              {settings?.siteName || "Wearch"}
            </span>
          </Link>
          <div className="w-24" />
          </div>
          </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#BBFF00]/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#BBFF00] text-sm tracking-[0.3em] uppercase mb-4 block"
            >
              Our Journal
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
              Ideas &{" "}
              <span className="italic font-extralight">Perspectives</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Explore our thoughts on architecture, design, sustainability, and
              the future of built environments.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto"
          >
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-[#BBFF00]/50 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 hover:text-white hover:border-white/20 transition-colors md:w-auto"
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </motion.div>

          {/* Category Pills */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap justify-center gap-3 mt-6 max-w-4xl mx-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                        selectedCategory === category
                          ? "bg-[#BBFF00] text-[#242222] font-medium"
                          : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && !searchQuery && selectedCategory === "All" && (
        <section className="px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Star size={20} className="text-[#BBFF00]" />
              <h2 className="text-white text-xl font-light tracking-wide">
                Featured
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.slice(0, 2).map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <Link href={`/articles/${article.slug}`}>
                    <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                      {article.coverImage ? (
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#BBFF00]/20 to-transparent" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-[#BBFF00] text-[#242222] text-xs font-medium rounded-full">
                            {article.category}
                          </span>
                          <span className="text-white/60 text-sm flex items-center gap-1">
                            <Clock size={14} />
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className="text-white text-2xl md:text-3xl font-light mb-3 group-hover:text-[#BBFF00] transition-colors">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-white/60 line-clamp-2 mb-4">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {article.authorImage ? (
                              <img
                                src={article.authorImage}
                                alt={article.author}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#BBFF00]/20 flex items-center justify-center">
                                <User size={16} className="text-[#BBFF00]" />
                              </div>
                            )}
                            <div>
                              <p className="text-white text-sm">{article.author}</p>
                              <p className="text-white/40 text-xs">
                                {formatDate(article.publishedAt)}
                              </p>
                            </div>
                          </div>
                          <motion.span
                            className="text-[#BBFF00] flex items-center gap-2"
                            whileHover={{ x: 5 }}
                          >
                            Read <ArrowRight size={18} />
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-xl font-light tracking-wide">
              {selectedCategory === "All" ? "All Articles" : selectedCategory}
              <span className="text-white/40 ml-3 text-sm">
                ({filteredArticles.length})
              </span>
            </h2>
          </div>

          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Search size={48} className="text-white/10 mx-auto mb-4" />
              <h3 className="text-white text-xl mb-2">No articles found</h3>
              <p className="text-white/40">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={`/articles/${article.slug}`}>
                    <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
                      {article.coverImage ? (
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#BBFF00]/10 via-white/5 to-transparent" />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-white/40 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(article.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-white text-xl font-light group-hover:text-[#BBFF00] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-white/50 text-sm line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          {article.authorImage ? (
                            <img
                              src={article.authorImage}
                              alt={article.author}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#BBFF00]/10 flex items-center justify-center">
                              <User size={14} className="text-[#BBFF00]" />
                            </div>
                          )}
                          <span className="text-white/60 text-sm">
                            {article.author}
                          </span>
                        </div>
                        <span className="text-white/40 text-xs flex items-center gap-1">
                          <Eye size={14} />
                          {article.views}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#BBFF00]/10 to-transparent border border-[#BBFF00]/20 rounded-3xl p-12"
          >
            <h2 className="text-white text-3xl md:text-4xl font-light mb-4">
              Have a project in mind?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how we can bring your vision to life through
              thoughtful design and architecture.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#BBFF00] text-[#242222] rounded-full font-semibold hover:bg-[#d4ff4d] transition-colors"
            >
              Start a Conversation
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}