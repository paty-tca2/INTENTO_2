import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import EmailTemplate from '@/components/bienvenida-template';
import { renderToString } from 'react-dom/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Tarjetas con Amor <noreply@tarjetasconamor.com>',
      to: [email],
      subject: '¡Bienvenido a Tarjetas con Amor!',
      react: EmailTemplate({ firstName })
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
