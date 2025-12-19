import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({
      where: { id: parseInt(id) },
      include: { items: { orderBy: { order: "asc" } } },
    });
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    return NextResponse.json({ ...service, items: service.items.map((i) => i.name) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Update items if provided
    if (body.items) {
      await prisma.serviceItem.deleteMany({ where: { serviceId: parseInt(id) } });
      await prisma.serviceItem.createMany({
        data: body.items.map((name: string, idx: number) => ({
          serviceId: parseInt(id),
          name,
          order: idx,
        })),
      });
    }

    const service = await prisma.service.update({
      where: { id: parseInt(id) },
      data: { title: body.title, icon: body.icon, description: body.description },
      include: { items: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json({ ...service, items: service.items.map((i) => i.name) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.service.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
