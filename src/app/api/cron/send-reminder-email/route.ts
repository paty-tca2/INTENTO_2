import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ReminderEmailTemplate from '@/components/reminder-email-template';
import prisma from '@/lib/db';

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(resendApiKey);

export async function GET(request: Request) {
  try {
    // Verify the request is coming from Vercel Cron
    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Get the date 7 days from now
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    
    // Find reminders for 7 days from now
    const reminders = await prisma.reminder.findMany({
      where: {
        day: sevenDaysFromNow.getDate(),
        month: sevenDaysFromNow.getMonth() + 1,
      },
      include: {
        user: true,
      },
    });

    // Send emails for each reminder
    for (const reminder of reminders) {
      await resend.emails.send({
        from: 'Tarjetas con Amor <noreply@tarjetasconamor.com>',
        to: [reminder.user.email],
        subject: `Recordatorio: ${reminder.name}`,
        react: ReminderEmailTemplate({ 
          firstName: reminder.user.firstName,
          eventName: reminder.name,
          eventDate: `${reminder.day}/${reminder.month}`,
        }),
      });
    }

    return NextResponse.json({ success: true, message: 'Reminder emails sent successfully' });
  } catch (error) {
    console.error('Error sending reminder emails:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
