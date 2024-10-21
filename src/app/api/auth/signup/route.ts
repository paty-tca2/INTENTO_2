import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password, first_name, last_name } = await req.json();
    console.log('Received signup data:', { email, first_name, last_name });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'Usuario ya existe' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username: email,
        password: hashedPassword,
        firstName: first_name,
        lastName: last_name,
      },
    });

    console.log('User created:', newUser.id);
    return NextResponse.json({ message: 'Usuario creado exitosamente' }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Error en el servidor', error: String(error) }, { status: 500 });
  }
}
