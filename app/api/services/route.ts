import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: { items: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });

    // Transform to match frontend expected format
    const transformed = services.map((s) => ({
      ...s,
      items: s.items.map((i) => i.name),
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const maxOrder = await prisma.service.aggregate({ _max: { order: true } });

    const service = await prisma.service.create({
      data: {
        title: body.title,
        icon: body.icon || "▲",
        description: body.description || null,
        order: (maxOrder._max.order || 0) + 1,
        items: body.items?.length ? {
          create: body.items.map((name: string, idx: number) => ({ name, order: idx })),
        } : undefined,
      },
      include: { items: true },
    });

    return NextResponse.json({ ...service, items: service.items.map((i) => i.name) }, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { orderedIds } = await request.json();
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "orderedIds must be an array" }, { status: 400 });
    }

    await Promise.all(orderedIds.map((id: number, index: number) =>
      prisma.service.update({ where: { id }, data: { order: index + 1 } })
    ));

    const services = await prisma.service.findMany({
      include: { items: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(services.map((s) => ({ ...s, items: s.items.map((i) => i.name) })));
  } catch (error) {
    console.error("Error reordering services:", error);
    return NextResponse.json({ error: "Failed to reorder services" }, { status: 500 });
  }
}
