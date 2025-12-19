import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    let contact = await prisma.contact.findFirst();
    if (!contact) {
      contact = await prisma.contact.create({
        data: { email: "hello@wearch.id", phone: "+62 812 3456 7890", address: "Bandung, Indonesia" },
      });
    }
    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    let contact = await prisma.contact.findFirst();

    if (contact) {
      contact = await prisma.contact.update({
        where: { id: contact.id },
        data: body,
      });
    } else {
      contact = await prisma.contact.create({ data: body });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}
