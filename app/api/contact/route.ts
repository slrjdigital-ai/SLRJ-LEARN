import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory rate limiting: IP address -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Basic input sanitizer to prevent XSS / HTML injection in generated emails
function sanitizeInput(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    const data = await request.json();

    // 2. Spam Honeypot Protection
    if (data.honeypot || data.website) {
      // Quietly succeed to fool automated spam bots
      return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });
    }

    // 3. Backend Validation & Input Sanitization
    const name = sanitizeInput(data.name?.trim() || '');
    const email = data.email?.trim() || '';
    const businessName = sanitizeInput(data.businessName?.trim() || '');
    const phone = sanitizeInput(data.phone?.trim() || '');
    const service = sanitizeInput(data.service?.trim() || 'General Inquiry');
    const budget = sanitizeInput(data.budget?.trim() || 'N/A');
    const message = sanitizeInput(data.message?.trim() || '');

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter your name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { success: false, error: 'Please enter your message details (minimum 5 characters).' },
        { status: 400 }
      );
    }

    // 4. SMTP Credential Security Verification
    const gmailUser = process.env.GMAIL_USER || process.env.EMAIL_USER || 'slrj.digital@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;

    if (!gmailAppPassword || gmailAppPassword === 'your_16_character_app_password_here') {
      console.error('SMTP Configuration Error: GMAIL_APP_PASSWORD is missing or default placeholder.');
      return NextResponse.json(
        {
          success: false,
          error: 'Server email service is not configured. Please set GMAIL_APP_PASSWORD in environment variables.',
        },
        { status: 500 }
      );
    }

    // 5. Configure Nodemailer with strict Gmail STARTTLS on Port 587
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      requireTLS: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Verify SMTP Connectivity
    try {
      await transporter.verify();
    } catch (verifyError: unknown) {
      const errMsg = verifyError instanceof Error ? verifyError.message : String(verifyError);
      console.error('SMTP Connectivity Error:', errMsg);
      return NextResponse.json(
        {
          success: false,
          error: 'SMTP Authentication failed. Please check GMAIL_APP_PASSWORD and account settings.',
        },
        { status: 500 }
      );
    }

    // 6. Admin Notification Email
    const adminMailOptions = {
      from: `"SLRJ Learn Contact" <${gmailUser}>`,
      to: 'slrj.digital@gmail.com',
      replyTo: email,
      subject: `New Project Inquiry from ${name} (${service})`,
      text: `
New Inquiry Received from SLRJ Learn Website

Name: ${name}
Business Name: ${businessName || 'N/A'}
Email: ${email}
Phone: ${phone || 'N/A'}
Service Needed: ${service}
Estimated Budget: ${budget}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0f19; color: #f3f4f6; padding: 30px; border-radius: 12px; border: 1px solid #1f2937;">
          <div style="border-bottom: 2px solid #8b5cf6; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #a78bfa; margin: 0;">New Inquiry</h2>
            <p style="color: #9ca3af; font-size: 14px; margin-top: 5px;">Submitted via slrjlearn.in contact form</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; color: #e5e7eb; font-size: 15px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #9ca3af;">Name:</td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Email:</td><td><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Phone:</td><td>${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Business:</td><td>${businessName || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Service:</td><td><span style="background-color: #374151; color: #c084fc; padding: 3px 8px; border-radius: 4px; font-size: 13px;">${service}</span></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Budget:</td><td>${budget}</td></tr>
          </table>

          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #374151;">
            <h4 style="color: #a78bfa; margin-top: 0;">Project Details:</h4>
            <div style="background-color: #111827; padding: 15px; border-radius: 8px; color: #d1d5db; line-height: 1.6; white-space: pre-wrap; border-left: 3px solid #8b5cf6;">${message}</div>
          </div>
        </div>
      `,
    };

    // 7. Automatic Visitor Confirmation Email
    const visitorMailOptions = {
      from: `"SLRJ Learn" <${gmailUser}>`,
      to: email,
      subject: 'Thank You for Contacting SLRJ Learn',
      text: `Hi ${name},

Thank you for reaching out to SLRJ Learn. We have received your message and will get back to you as soon as possible.

Best regards,
SLRJ Learn Team
https://slrjlearn.in
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0f19; color: #f3f4f6; padding: 32px; border-radius: 12px; border: 1px solid #1f2937;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">SLRJ <span style="color: #a78bfa;">LEARN</span></h1>
            <p style="color: #9ca3af; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px;">Sankalp • Lakshya • Rachna • Josh</p>
          </div>

          <div style="background-color: #111827; padding: 24px; border-radius: 8px; border: 1px solid #1f2937; margin-bottom: 24px;">
            <h3 style="color: #38bdf8; margin-top: 0;">Thank You for Reaching Out!</h3>
            <p style="color: #e5e7eb; line-height: 1.6; margin-bottom: 16px;">Hi ${name},</p>
            <p style="color: #d1d5db; line-height: 1.6; margin-bottom: 0;">
              Thank you for reaching out to SLRJ Learn. We have received your message and will get back to you as soon as possible.
            </p>
          </div>

          <div style="border-top: 1px solid #1f2937; padding-top: 20px; text-align: center; color: #6b7280; font-size: 13px;">
            <p style="margin: 0 0 8px 0;">Need immediate assistance? Connect with us directly:</p>
            <p style="margin: 0;">
              <a href="https://wa.me/918466974408" style="color: #34d399; text-decoration: none; margin-right: 16px;">WhatsApp</a>
              <a href="mailto:slrj.digital@gmail.com" style="color: #38bdf8; text-decoration: none;">slrj.digital@gmail.com</a>
            </p>
          </div>
        </div>
      `,
    };

    // 8. Send both admin notification and visitor confirmation email
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(visitorMailOptions),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out to SLRJ Learn. We have received your message and will get back to you as soon as possible.',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Failed to send message. Please check your network connection or try WhatsApp.';
    console.error('Contact API Error:', errMsg);
    return NextResponse.json(
      {
        success: false,
        error: errMsg,
      },
      { status: 500 }
    );
  }
}
