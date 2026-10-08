import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSubscriberCount, addSubscriber } from '@/lib/newsletter';

// In-memory rate limiting: IP address -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

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

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// GET: Fetch current subscriber count
export async function GET() {
  try {
    const count = getSubscriberCount();
    return NextResponse.json({ success: true, count }, { status: 200 });
  } catch (error) {
    console.error('Error fetching subscriber count:', error);
    return NextResponse.json({ success: true, count: 0 }, { status: 200 });
  }
}

// POST: Add new subscriber and dispatch emails
export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    const data = await request.json();

    // 2. Spam Honeypot Check
    if (data.honeypot || data.website) {
      return NextResponse.json(
        { success: true, message: 'Subscribed successfully.', count: getSubscriberCount() },
        { status: 200 }
      );
    }

    // 3. Validation
    const rawEmail = typeof data.email === 'string' ? data.email.trim() : '';
    if (!rawEmail || !isValidEmail(rawEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 4. Save subscriber and get updated count
    const { count, isNew, subscriber } = addSubscriber(rawEmail);

    if (!isNew) {
      return NextResponse.json(
        {
          success: true,
          count,
          alreadySubscribed: true,
          message: "You're already subscribed to the SLRJ Digital Dispatch!",
        },
        { status: 200 }
      );
    }

    // 5. Send Email Notifications via Nodemailer (if configured)
    const gmailUser = process.env.GMAIL_USER || process.env.EMAIL_USER || 'slrj.digital@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;

    if (gmailAppPassword && gmailAppPassword !== 'your_16_character_app_password_here') {
      try {
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

        const formattedDate = new Date(subscriber.subscribedAt).toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'short',
        });

        // 5a. Admin Notification Email
        const adminMailOptions = {
          from: `"SLRJ Digital Dispatch" <${gmailUser}>`,
          to: 'slrj.digital@gmail.com',
          replyTo: subscriber.email,
          subject: `⚡ New Newsletter Subscriber: ${subscriber.email} (#${count})`,
          text: `
New Newsletter Subscription:
Email: ${subscriber.email}
Total Subscribers: ${count}
Date: ${formattedDate} IST
IP: ${ip}
          `.trim(),
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #04020F; color: #e2e8f0; margin: 0; padding: 24px; }
    .card { max-width: 560px; margin: 0 auto; background: #0b081e; border: 1px solid rgba(168,85,247,0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
    .header { background: linear-gradient(135deg, #7928CA 0%, #FF0080 50%, #00DFD8 100%); padding: 24px 28px; color: #fff; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
    .body { padding: 28px; }
    .stat-pill { display: inline-block; padding: 6px 14px; background: rgba(6,182,212,0.15); border: 1px solid rgba(6,182,212,0.4); border-radius: 999px; color: #22d3ee; font-weight: bold; font-size: 13px; margin-bottom: 20px; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; font-weight: 700; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #f8fafc; font-family: monospace; background: rgba(255,255,255,0.04); padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); }
    .footer { padding: 18px 28px; background: #070514; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🚀 New Subscriber Milestone</h1>
    </div>
    <div class="body">
      <div class="stat-pill">✨ Total Subscribers: ${count}</div>
      <div class="field">
        <div class="field-label">Subscriber Email</div>
        <div class="field-value">${subscriber.email}</div>
      </div>
      <div class="field">
        <div class="field-label">Subscription Timestamp</div>
        <div class="field-value">${formattedDate} IST</div>
      </div>
      <div class="field">
        <div class="field-label">Source IP Address</div>
        <div class="field-value">${ip}</div>
      </div>
    </div>
    <div class="footer">
      SLRJ Digital Automated Dispatch System &bull; slrjdigital.com
    </div>
  </div>
</body>
</html>
          `,
        };

        // 5b. Subscriber Welcome Email
        const welcomeMailOptions = {
          from: `"SLRJ Digital" <${gmailUser}>`,
          to: subscriber.email,
          subject: `Welcome to SLRJ Digital Tech & Growth Dispatch 🚀`,
          text: `
Welcome to SLRJ Digital!

Thank you for subscribing to our Tech & Growth Dispatch. You are now part of our community of ${count}+ forward-thinking founders, designers, and engineers.

What you can expect:
- Production-grade Next.js & React architecture insights
- High-converting UI/UX design teardowns
- Modern web performance optimization strategies (Core Web Vitals)
- Early access to new tools, case studies, and engineering drops

Need a high-performance web platform or app for your business?
- Explore our work: https://slrjdigital.com/projects
- Direct WhatsApp Inquiry: https://wa.me/918466974408
- Email our engineers: slrj.digital@gmail.com

Stay ahead of the curve,
Shahid Kouluri
Founder & Lead Engineer, SLRJ Digital
https://slrjdigital.com
          `.trim(),
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; background-color: #020108; color: #e2e8f0; margin: 0; padding: 24px; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background: #070517; border: 1px solid rgba(168,85,247,0.3); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.8); }
    .header { background: linear-gradient(135deg, #180a3a 0%, #0c0824 50%, #051424 100%); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 36px 32px; text-align: center; }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(6,182,212,0.15); border: 1px solid rgba(6,182,212,0.3); border-radius: 999px; color: #22d3ee; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 12px; }
    .logo-title { font-size: 26px; font-weight: 900; margin: 0; color: #ffffff; letter-spacing: 0.05em; }
    .logo-gradient { background: linear-gradient(to right, #A855F7, #EC4899, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .body { padding: 32px; }
    h2 { font-size: 20px; color: #ffffff; margin-top: 0; margin-bottom: 12px; font-weight: 800; }
    p { color: #94a3b8; font-size: 14px; margin-bottom: 16px; }
    .benefit-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin: 20px 0; }
    .benefit-item { display: flex; align-items: flex-start; margin-bottom: 10px; font-size: 13px; color: #cbd5e1; }
    .cta-button { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #06B6D4 100%); color: #ffffff !important; text-decoration: none; font-weight: 800; font-size: 14px; border-radius: 12px; text-align: center; margin: 16px 0 8px; box-shadow: 0 4px 20px rgba(168,85,247,0.4); }
    .whatsapp-btn { display: inline-block; padding: 12px 24px; background: #25D366; color: #000000 !important; text-decoration: none; font-weight: 800; font-size: 13px; border-radius: 12px; text-align: center; margin-left: 8px; }
    .footer { padding: 24px 32px; background: #03020a; border-top: 1px solid rgba(255,255,255,0.05); font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">DISPATCH CONFIRMED // #${count}</div>
      <h1 class="logo-title">SLRJ <span class="logo-gradient">DIGITAL</span></h1>
      <p style="margin: 8px 0 0; color: #a855f7; font-size: 12px; font-weight: 700; letter-spacing: 0.15em;">SANKALP &bull; LAKSHYA &bull; RACHNA &bull; JOSH</p>
    </div>
    <div class="body">
      <h2>You're in the Inner Circle! ⚡</h2>
      <p>Thank you for subscribing to the <strong>SLRJ Digital Dispatch</strong>. You’ve joined an elite group of ${count}+ founders, executives, and developers receiving high-impact technology insights.</p>
      
      <div class="benefit-box">
        <p style="margin-top: 0; color: #06B6D4; font-weight: 700; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">What you can look forward to:</p>
        <div class="benefit-item">🚀 <strong>Next-Gen Web Architecture:</strong> Next.js 16, React 19, and full-stack performance blueprints.</div>
        <div class="benefit-item">⚡ <strong>Conversion-Engineered UI/UX:</strong> Real client breakdowns and interface optimization strategies.</div>
        <div class="benefit-item">💎 <strong>Core Web Vitals & Speed:</strong> How we achieve sub-second load times and 100/100 performance scores.</div>
      </div>

      <p>Planning your next flagship web application, e-commerce store, or digital rebrand?</p>

      <div style="margin: 24px 0; text-align: center;">
        <a href="https://slrjdigital.com/projects" class="cta-button">Explore Our Work</a>
        <a href="https://wa.me/918466974408?text=Hi%20SLRJ%20Digital,%20I%20just%20subscribed%20to%20your%20newsletter!" class="whatsapp-btn">Chat on WhatsApp</a>
      </div>

      <p style="margin-top: 24px; font-size: 12px; color: #64748b;">
        Warm regards,<br />
        <strong style="color: #cbd5e1;">Shahid Kouluri</strong><br />
        Founder & Lead Engineer &bull; SLRJ Digital
      </p>
    </div>
    <div class="footer">
      &copy; 2026 SLRJ Digital. All rights reserved.<br />
      If you did not request this subscription, you can disregard this email.
    </div>
  </div>
</body>
</html>
          `,
        };

        // Dispatch both emails in parallel
        await Promise.allSettled([
          transporter.sendMail(adminMailOptions),
          transporter.sendMail(welcomeMailOptions),
        ]);
      } catch (mailError: unknown) {
        // Log mail error, but do not fail the subscription since data is saved
        const errMsg = mailError instanceof Error ? mailError.message : String(mailError);
        console.error('Newsletter Email Dispatch Warning:', errMsg);
      }
    } else {
      console.log(`[Newsletter] Subscribed ${subscriber.email}. SMTP credentials not configured for sending emails.`);
    }

    return NextResponse.json(
      {
        success: true,
        count,
        alreadySubscribed: false,
        message: 'Welcome aboard! Check your inbox for confirmation.',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Internal server error. Please try again later.';
    console.error('Newsletter API Error:', errMsg);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
