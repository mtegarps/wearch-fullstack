import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET single about service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = await prisma.aboutService.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    
    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching about service:", error);
    return NextResponse.json({ error: "Failed to fetch about service" }, { status: 500 });
  }
}

// PUT update about service
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const service = await prisma.aboutService.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        description: body.description || null,
        iconUrl: body.iconUrl || null,
      },
    });
    
    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating about service:", error);
    return NextResponse.json({ error: "Failed to update about service" }, { status: 500 });
  }
}

// DELETE about service
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.aboutService.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting about service:", error);
    return NextResponse.json({ error: "Failed to delete about service" }, { status: 500 });
  }
}
