import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { initialFeedbackList, calculateFeedbackStats, FeedbackItem } from '@/data/feedback';

// In-memory feedback store (persists during runtime)
let feedbackStore: FeedbackItem[] = [...initialFeedbackList];

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

// GET: Fetch all feedback items & stats
export async function GET() {
  const stats = calculateFeedbackStats(feedbackStore);
  return NextResponse.json(
    {
      success: true,
      feedback: feedbackStore,
      stats,
    },
    { status: 200 }
  );
}

// DELETE endpoint has been permanently removed for security protection against unauthorized data wipes.

// POST: Submit new feedback & rating
export async function POST(request: Request) {
  try {
    // 1. Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many feedback submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const data = await request.json();

    // 2. Spam Honeypot check
    if (data.honeypot || data.website) {
      return NextResponse.json({ success: true, message: 'Feedback submitted successfully.' }, { status: 200 });
    }

    // Handle Like action on existing feedback
    if (data.action === 'like' && data.feedbackId) {
      const item = feedbackStore.find((f) => f.id === data.feedbackId);
      if (item) {
        item.likes += 1;
        return NextResponse.json({ success: true, likes: item.likes }, { status: 200 });
      }
      return NextResponse.json({ success: false, error: 'Feedback item not found' }, { status: 404 });
    }

    // 3. Validation & Sanitization
    const name = sanitizeInput(data.name?.trim() || '');
    const email = data.email?.trim() || '';
    const role = sanitizeInput(data.role?.trim() || '');
    const company = sanitizeInput(data.company?.trim() || '');
    const service = sanitizeInput(data.service?.trim() || 'General Experience');
    const comment = sanitizeInput(data.comment?.trim() || '');
    const ratingNum = Number(data.rating);
    const recommend = Boolean(data.recommend !== false); // default true

    if (!ratingNum || isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { success: false, error: 'Please select a star rating from 1 to 5.' },
        { status: 400 }
      );
    }

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter your name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!comment || comment.length < 5) {
      return NextResponse.json(
        { success: false, error: 'Please enter feedback details (minimum 5 characters).' },
        { status: 400 }
      );
    }

    // 4. Create new Feedback item
    const newItem: FeedbackItem = {
      id: `fb-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name,
      role: role || 'Client / Visitor',
      company: company || '',
      email,
      rating: ratingNum,
      service,
      comment,
      recommend,
      date: new Date().toISOString().split('T')[0],
      verified: false,
      likes: 0,
    };

    // Prepend to top of feedback list
    feedbackStore = [newItem, ...feedbackStore];

    // 5. Send Email notification if SMTP configured
    const gmailUser = process.env.GMAIL_USER || process.env.EMAIL_USER || 'slrj.digital@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;

    if (gmailAppPassword && gmailAppPassword !== 'your_16_character_app_password_here') {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: gmailUser,
            pass: gmailAppPassword,
          },
        });

        const starsStr = '★'.repeat(ratingNum) + '☆'.repeat(5 - ratingNum);
        const adminMailOptions = {
          from: `"SLRJ Digital Feedback" <${gmailUser}>`,
          to: 'slrj.digital@gmail.com',
          replyTo: email || undefined,
          subject: `⭐ New ${ratingNum}-Star Feedback from ${name}`,
          text: `
New Feedback Received on SLRJ Digital:

Rating: ${ratingNum}/5 (${starsStr})
Name: ${name}
Role/Company: ${role} ${company ? '@ ' + company : ''}
Email: ${email || 'N/A'}
Service: ${service}
Would Recommend: ${recommend ? 'Yes' : 'No'}

Feedback Details:
${comment}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0f19; color: #f3f4f6; padding: 30px; border-radius: 12px; border: 1px solid #1f2937;">
              <div style="border-bottom: 2px solid #8b5cf6; padding-bottom: 15px; margin-bottom: 20px;">
                <h2 style="color: #a78bfa; margin: 0;">New Rating & Feedback Received</h2>
                <div style="color: #facc15; font-size: 24px; margin-top: 8px;">${starsStr} <span style="color: #ffffff; font-size: 18px;">(${ratingNum}/5)</span></div>
              </div>
              
              <table style="width: 100%; border-collapse: collapse; color: #e5e7eb; font-size: 15px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #9ca3af;">Name:</td><td>${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Role/Company:</td><td>${role} ${company ? `at ${company}` : ''}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Email:</td><td>${email ? `<a href="mailto:${email}" style="color: #38bdf8;">${email}</a>` : 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Service:</td><td><span style="background-color: #374151; color: #c084fc; padding: 3px 8px; border-radius: 4px; font-size: 13px;">${service}</span></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #9ca3af;">Recommends:</td><td>${recommend ? '✅ Yes' : '❌ No'}</td></tr>
              </table>

              <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #374151;">
                <h4 style="color: #a78bfa; margin-top: 0;">Feedback Message:</h4>
                <div style="background-color: #111827; padding: 15px; border-radius: 8px; color: #d1d5db; line-height: 1.6; white-space: pre-wrap; border-left: 3px solid #8b5cf6;">${comment}</div>
              </div>
            </div>
          `,
        };

        await transporter.sendMail(adminMailOptions);
      } catch (emailErr) {
        console.error('Failed sending feedback notification email:', emailErr);
      }
    }

    const updatedStats = calculateFeedbackStats(feedbackStore);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your feedback! Your review has been published.',
        feedback: newItem,
        stats: updatedStats,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Failed to submit feedback. Please try again.';
    console.error('Feedback API Error:', errMsg);
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
