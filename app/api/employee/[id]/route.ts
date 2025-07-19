import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request, context: any) {
  const { id } = context.params;

  await prisma.employee.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: 'Deleted' });
}

export async function PUT(request: Request, context: any) {
  const { id } = context.params;
  const data = await request.json();

  const employee = await prisma.employee.update({
    where: { id: Number(id) },
    data: {
      name: data.name,
      position: data.position,
      salary: data.salary,
    },
  });

  return NextResponse.json(employee);
}
