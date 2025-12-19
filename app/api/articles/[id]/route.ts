import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch single article by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check if id is numeric or slug
    const isNumeric = /^\d+$/.test(id);
    
    const article = await prisma.article.findFirst({
      where: isNumeric 
        ? { id: parseInt(id) }
        : { slug: id },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Increment view count if accessing by slug (public view)
    if (!isNumeric) {
      await prisma.article.update({
        where: { id: article.id },
        data: { views: { increment: 1 } },
      });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}

// PUT - Update article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Generate new slug if title changed
    const slug = data.slug || data.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Recalculate read time
    const wordCount = data.content?.split(/\s+/).length || 0;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    // Handle publish date
    let publishedAt = undefined;
    if (data.status === "Published") {
      const existing = await prisma.article.findUnique({
        where: { id: parseInt(id) },
        select: { publishedAt: true, status: true },
      });
      if (!existing?.publishedAt || existing.status !== "Published") {
        publishedAt = new Date();
      }
    }

    const article = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        category: data.category,
        tags: data.tags,
        author: data.author,
        authorImage: data.authorImage,
        readTime,
        featured: data.featured,
        status: data.status,
        ...(publishedAt && { publishedAt }),
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

// DELETE - Delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.article.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
