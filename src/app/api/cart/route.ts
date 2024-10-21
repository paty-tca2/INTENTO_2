import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';


export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: true },
  });

  return NextResponse.json(user?.cart || []);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { templateId, options, price } = await req.json();
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email ?? '' },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  try {
    const cartItem = await prisma.cartItem.create({
      data: {
        userId: user.id,
        templateId,
        options: JSON.stringify(options),
        price,
      },
    });

    const updatedCart = await prisma.cartItem.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Error creating cart item:', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing cart item id' }, { status: 400 });
  }

  await prisma.cartItem.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}
