import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const member = await prisma.teamMember.findUnique({ where: { id: parseInt(id) } });
    if (!member) return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const member = await prisma.teamMember.update({
      where: { id: parseInt(id) },
      data: { name: body.name, role: body.role, specialty: body.specialty, image: body.image, email: body.email, phone: body.phone, linkedin: body.linkedin, instagram: body.instagram },
    });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.teamMember.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
