import { Resend } from 'resend';
import EmailTemplate from '@/components/bienvenida-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, firstName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Tarjetas con Amor <noreply@tarjetasconamor.com>',
      to: email,
      subject: '¡Bienvenido a Tarjetas con Amor!',
      react: EmailTemplate({ firstName })
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    console.log('Welcome email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
}
