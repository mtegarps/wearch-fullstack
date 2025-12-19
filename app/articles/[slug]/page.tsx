"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
  Tag,
  User,
  Eye,
  ChevronUp,
} from "lucide-react";

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
  publishedAt: string | null;
  views: number;
}

interface Settings {
  siteName: string;
  primaryColor: string;
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    fetchData();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadProgress(progress);
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchData = async () => {
    try {
      const [articleRes, settingsRes, allArticlesRes] = await Promise.all([
        fetch(`/api/articles/${slug}`),
        fetch("/api/settings"),
        fetch("/api/articles?status=Published&limit=4"),
      ]);

      if (!articleRes.ok) {
        setArticle(null);
        setLoading(false);
        return;
      }

      const articleData = await articleRes.json();
      const settingsData = await settingsRes.json();
      const allArticles = await allArticlesRes.json();

      setArticle(articleData);
      setSettings(settingsData);

      // Get related articles (same category, excluding current)
      const related = allArticles
        .filter((a: Article) => a.id !== articleData.id && a.category === articleData.category)
        .slice(0, 3);
      setRelatedArticles(related);
    } catch (error) {
      console.error("Failed to fetch article:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = article?.title || "";

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "copy":
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (!article) {
    return (
      <div className="min-h-screen bg-[#242222] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-white text-4xl font-light mb-4">Article Not Found</h1>
          <p className="text-white/60 mb-8">
            The article you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#BBFF00] text-[#242222] rounded-full font-semibold"
          >
            <ArrowLeft size={18} />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const tags = article.tags?.split(",").map((t) => t.trim()).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-[#242222]">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <motion.div
          className="h-full bg-[#BBFF00]"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#242222]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/articles"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm hidden sm:block">Back to Articles</span>
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
              <path d="M20 20 L35 80 L20 80 Z" fill="#BBFF00" />
              <path d="M42 20 L57 80 L42 80 Z" fill="#BBFF00" />
              <path d="M64 20 L79 80 L64 80 Z" fill="#BBFF00" />
            </svg>
            <span className="text-white font-semibold hidden sm:block">
              {settings?.siteName || "Wearch"}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleShare("copy")}
              className="p-2 text-white/60 hover:text-white transition-colors"
              title="Copy link"
            >
              {copied ? <Check size={20} className="text-[#BBFF00]" /> : <Share2 size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-24">
        {article.coverImage && (
          <div className="relative h-[50vh] md:h-[70vh]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242222] via-[#242222]/50 to-transparent" />
          </div>
        )}
        <div className={`max-w-4xl mx-auto px-6 ${article.coverImage ? "-mt-48 relative z-10" : "pt-16"}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-[#BBFF00] text-[#242222] text-sm font-medium rounded-full">
                {article.category}
              </span>
              <span className="text-white/40 text-sm flex items-center gap-1">
                <Eye size={16} />
                {article.views} views
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8">
                {article.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                {article.authorImage ? (
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#BBFF00]/20 flex items-center justify-center">
                    <User size={20} className="text-[#BBFF00]" />
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">{article.author}</p>
                  <p className="text-white/40 text-sm">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/40 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {article.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 flex-wrap">
              <Tag size={18} className="text-white/40" />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/5 text-white/60 text-sm rounded-full hover:bg-white/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-white text-lg font-light mb-4">Share this article</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleShare("twitter")}
              className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Twitter size={20} />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Facebook size={20} />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Linkedin size={20} />
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              {copied ? <Check size={20} className="text-[#BBFF00]" /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-8 bg-white/5 rounded-3xl">
          <div className="flex items-start gap-4">
            {article.authorImage ? (
              <img
                src={article.authorImage}
                alt={article.author}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#BBFF00]/20 flex items-center justify-center flex-shrink-0">
                <User size={24} className="text-[#BBFF00]" />
              </div>
            )}
            <div>
              <h4 className="text-white text-lg font-medium mb-1">
                Written by {article.author}
              </h4>
              <p className="text-white/50 text-sm">
                Sharing insights on architecture, design, and the built environment.
                Follow along for more perspectives and ideas.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
          <h2 className="text-white text-2xl font-light mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((related, index) => (
              <motion.article
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/articles/${related.slug}`}>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                    {related.coverImage ? (
                      <img
                        src={related.coverImage}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#BBFF00]/10 to-transparent" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2 text-white/40 text-sm">
                    <span>{formatDate(related.publishedAt)}</span>
                    <span>·</span>
                    <span>{related.readTime}</span>
                  </div>
                  <h3 className="text-white font-light text-lg group-hover:text-[#BBFF00] transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-[#BBFF00]/10 to-transparent border border-[#BBFF00]/20 rounded-3xl p-12"
        >
          <h2 className="text-white text-3xl font-light mb-4">
            Explore More Stories
          </h2>
          <p className="text-white/60 mb-8">
            Discover more insights and perspectives from our team.
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#BBFF00] text-[#242222] rounded-full font-semibold hover:bg-[#d4ff4d] transition-colors"
          >
            View All Articles
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#BBFF00] text-[#242222] rounded-full flex items-center justify-center shadow-lg z-40"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}

      {/* Article Styles */}
      <style jsx global>{`
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4 {
          color: white;
          font-weight: 300;
        }

        .article-content h1 {
          font-size: 2.5rem;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }

        .article-content h2 {
          font-size: 2rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }

        .article-content h3 {
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .article-content p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .article-content a {
          color: #BBFF00;
          text-decoration: underline;
        }

        .article-content a:hover {
          color: #d4ff4d;
        }

        .article-content blockquote {
          border-left: 4px solid #BBFF00;
          padding-left: 1.5rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.6);
          margin: 2rem 0;
        }

        .article-content ul,
        .article-content ol {
          color: rgba(255, 255, 255, 0.7);
          padding-left: 1.5rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
        }

        .article-content code {
          background: rgba(187, 255, 0, 0.1);
          color: #BBFF00;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }

        .article-content pre {
          background: #0d0d0d;
          border-radius: 0.75rem;
          padding: 1.5rem;
          overflow-x: auto;
        }

        .article-content pre code {
          background: transparent;
          padding: 0;
        }

        .article-content img {
          border-radius: 1rem;
          margin: 2rem 0;
        }

        .article-content hr {
          border-color: rgba(255, 255, 255, 0.1);
          margin: 3rem 0;
        }

        .article-content iframe {
          width: 100%;
          max-width: 100%;
          border-radius: 0.75rem;
          margin: 2rem 0;
        }

        .article-content strong {
          color: white;
        }
      `}</style>
    </div>
  );
}
