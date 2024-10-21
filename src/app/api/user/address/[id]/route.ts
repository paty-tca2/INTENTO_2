import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";

import prisma from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const addressId = parseInt(params.id);

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the address belongs to the user
    const address = await prisma.address.findFirst({
      where: { id: addressId, userId: user.id },
    });

    if (!address) {
      return NextResponse.json({ error: 'Address not found or does not belong to the user' }, { status: 404 });
    }

    // Delete the address
    await prisma.address.delete({ where: { id: addressId } });

    return NextResponse.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}