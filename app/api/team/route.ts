import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const maxOrder = await prisma.teamMember.aggregate({ _max: { order: true } });

    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        specialty: body.specialty || null,
        image: body.image || null,
        email: body.email || null,
        phone: body.phone || null,
        linkedin: body.linkedin || null,
        instagram: body.instagram || null,
        order: (maxOrder._max.order || 0) + 1,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
