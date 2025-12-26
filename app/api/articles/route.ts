import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    const where: Record<string, unknown> = {};
    
    if (status) where.status = status;
    if (category) where.category = category;
    if (featured === "true") where.featured = true;

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

// POST - Create new article
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate slug from title
    const slug = data.slug || data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Calculate read time (average 200 words per minute)
    const wordCount = data.content?.split(/\s+/).length || 0;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        category: data.category || "Architecture",
        tags: data.tags,
        author: data.author || "wearch Studio",
        authorImage: data.authorImage,
        readTime,
        featured: data.featured || false,
        status: data.status || "Draft",
        publishedAt: data.status === "Published" ? new Date() : null,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
