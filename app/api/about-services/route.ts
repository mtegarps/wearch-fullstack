import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all about services
export async function GET() {
  try {
    const services = await prisma.aboutService.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching about services:", error);
    return NextResponse.json({ error: "Failed to fetch about services" }, { status: 500 });
  }
}

// POST create new about service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get max order
    const maxOrder = await prisma.aboutService.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    });
    
    const service = await prisma.aboutService.create({
      data: {
        title: body.title,
        description: body.description || null,
        iconUrl: body.iconUrl || null,
        order: (maxOrder?.order ?? 0) + 1,
      },
    });
    
    return NextResponse.json(service);
  } catch (error) {
    console.error("Error creating about service:", error);
    return NextResponse.json({ error: "Failed to create about service" }, { status: 500 });
  }
}

// PATCH reorder services
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderedIds } = body;
    
    // Update order for each service
    await Promise.all(
      orderedIds.map((id: number, index: number) =>
        prisma.aboutService.update({
          where: { id },
          data: { order: index + 1 },
        })
      )
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering about services:", error);
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 });
  }
}
