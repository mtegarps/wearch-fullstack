import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { gallery: { orderBy: { order: "asc" } } },
    });

    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const transformed = {
      ...project,
      gallery: project.gallery.map((g) => ({ url: g.url, title: g.title, description: g.description })),
    };

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    console.log("=== UPDATE PROJECT DEBUG ===");
    console.log("Project ID:", id);
    console.log("Received body:", body);
    console.log("Status value:", body.status);
    console.log("Status type:", typeof body.status);

    const projectId = parseInt(id);

    // Update project data FIRST
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: body.title,
        location: body.location,
        year: body.year,
        image: body.image,
        category: body.category,
        area: body.area,
        duration: body.duration,
        client: body.client,
        description: body.description,
        status: body.status, // This should be "Published" or "Draft"
        featuredOnHome: body.featuredOnHome ?? false,
        homeOrder: body.homeOrder ?? 0,
      },
    });

    console.log("Project updated, new status:", updatedProject.status);

    // THEN update gallery if provided
    if (body.gallery && Array.isArray(body.gallery)) {
      console.log("Updating gallery, count:", body.gallery.length);
      
      // Delete existing gallery items
      await prisma.projectGallery.deleteMany({ 
        where: { projectId } 
      });

      // Create new gallery items
      if (body.gallery.length > 0) {
        await prisma.projectGallery.createMany({
          data: body.gallery.map((g: any, idx: number) => ({
            projectId,
            url: g.url,
            title: g.title,
            description: g.description || null,
            order: idx,
          })),
        });
      }
    }

    // Fetch the complete updated project with gallery
    const finalProject = await prisma.project.findUnique({
      where: { id: projectId },
      include: { gallery: { orderBy: { order: "asc" } } },
    });

    console.log("Final project status:", finalProject?.status);
    console.log("=== END DEBUG ===");

    return NextResponse.json(finalProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}