import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const employee = await prisma.employee.update({
    where: { id: Number(params.id) },
    data: {
      name: data.name,
      position: data.position,
      salary: data.salary,
    },
  });
  return NextResponse.json(employee);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.employee.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: 'Deleted' });
}
