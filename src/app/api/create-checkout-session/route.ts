import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth/next';

import prisma from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use the latest API version
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: true },
  });

  if (!user || !user.cart.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const lineItems = user.cart.map(item => ({
    price_data: {
      currency: 'mxn',
      product_data: {
        name: `Template ${item.templateId}`,
        description: `${JSON.parse(item.options).type} - ${JSON.parse(item.options).quantity} units`,
      },
      unit_amount: Number(item.price) * 100, // Stripe expects amounts in cents
    },
    quantity: JSON.parse(item.options).quantity,
  }));

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/carrito`,
      customer_email: user.email,
    });

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}