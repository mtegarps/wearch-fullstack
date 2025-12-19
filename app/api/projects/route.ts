import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get("all") === "true";

    const projects = await prisma.project.findMany({
      where: includeAll ? {} : { status: "Published" },
      include: { gallery: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
    });

    // Transform to match frontend expected format
    const transformed = projects.map((p) => ({
      ...p,
      gallery: p.gallery.map((g) => ({ url: g.url, title: g.title, description: g.description })),
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const project = await prisma.project.create({
      data: {
        title: body.title,
        location: body.location,
        year: body.year,
        image: body.image || null,
        category: body.category,
        area: body.area || null,
        duration: body.duration || null,
        client: body.client || null,
        description: body.description || null,
        status: body.status || "Draft",
        gallery: body.gallery?.length ? {
          create: body.gallery.map((g: any, idx: number) => ({
            url: g.url,
            title: g.title,
            description: g.description || null,
            order: idx,
          })),
        } : undefined,
      },
      include: { gallery: true },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
