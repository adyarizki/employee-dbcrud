import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const employees = await prisma.employee.findMany();
  return NextResponse.json(employees);
}

export async function POST(req: Request) {
  const data = await req.json();
  const employee = await prisma.employee.create({
    data: {
      name: data.name,
      position: data.position,
      salary: data.salary,
    },
  });
  return NextResponse.json(employee);
}
