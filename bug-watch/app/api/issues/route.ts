import { NextRequest, NextResponse } from "next/server";
import { issuesSchema } from "../zod";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = issuesSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}