import nodemailer from "nodemailer";

// In-memory OTP storage: email -> { code: string; expiresAt: number; attempts: number }
interface OtpRecord {
  code: string;
  expiresAt: number;
  attempts: number;
}

const otpStore = new Map<string, OtpRecord>();

// Rate limit: email -> timestamp of last OTP sent
const lastSentStore = new Map<string, number>();

// In-memory rate limiting: IP -> timestamps
const ipRateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 mins
const MAX_REQUESTS_PER_WINDOW = 8;

export function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const list = ipRateLimit.get(ip) || [];
  const valid = list.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (valid.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // limited
  }
  valid.push(now);
  ipRateLimit.set(ip, valid);
  return true; // allowed
}

export function generateOTP(): string {
  // Generate 6 digit numeric code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function saveOTP(email: string, code: string): void {
  const normalized = email.trim().toLowerCase();
  otpStore.set(normalized, {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
    attempts: 0,
  });
  lastSentStore.set(normalized, Date.now());
}

export function canResendOTP(email: string): { allowed: boolean; waitSeconds?: number } {
  const normalized = email.trim().toLowerCase();
  const last = lastSentStore.get(normalized);
  if (!last) return { allowed: true };
  const diff = Date.now() - last;
  const cooldown = 45 * 1000; // 45 seconds cooldown
  if (diff < cooldown) {
    return { allowed: false, waitSeconds: Math.ceil((cooldown - diff) / 1000) };
  }
  return { allowed: true };
}

export function verifyOTP(
  email: string,
  inputCode: string
): { success: boolean; error?: string } {
  const normalized = email.trim().toLowerCase();
  const record = otpStore.get(normalized);

  if (!record) {
    return {
      success: false,
      error: "No active verification code found for this email. Please request a new code.",
    };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(normalized);
    return {
      success: false,
      error: "Verification code has expired. Please request a new code.",
    };
  }

  if (record.attempts >= 5) {
    otpStore.delete(normalized);
    return {
      success: false,
      error: "Too many failed attempts. Please request a new verification code.",
    };
  }

  if (record.code.trim() !== inputCode.trim()) {
    record.attempts += 1;
    return {
      success: false,
      error: `Invalid code. ${5 - record.attempts} attempts remaining.`,
    };
  }

  // Success: consume OTP immediately so it can never be reused
  otpStore.delete(normalized);
  return { success: true };
}

export async function sendOtpEmail(email: string, code: string): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER || "slrj.digital@gmail.com";
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || "";

  if (!gmailAppPassword) {
    console.warn("GMAIL_APP_PASSWORD is not set. Simulating OTP code delivery:", code);
    return true;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS
    requireTLS: true,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const mailOptions = {
    from: `"SLRJ Learn Security" <${gmailUser}>`,
    to: email,
    subject: `Your SLRJ Learn Verification Code: ${code}`,
    text: `Your SLRJ Learn secure login verification code is: ${code}

This code will expire in 10 minutes. If you did not request this login code, please ignore this email.

SLRJ Learn - Engineering & CS Learning Portal
https://slrjlearn.in`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #060713; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #060713; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" style="max-width: 520px; background: #0c0e23; border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 24px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.8);">
                
                <!-- Logo & Badge -->
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <div style="display: inline-block; padding: 6px 14px; border-radius: 999px; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); color: #818cf8; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                      🔐 SECURE AUTHENTICATION
                    </div>
                  </td>
                </tr>

                <!-- Heading -->
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      SLRJ <span style="color: #818cf8;">Learn</span> Portal
                    </h1>
                  </td>
                </tr>

                <!-- Description -->
                <tr>
                  <td align="center" style="padding-bottom: 32px; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                    Here is your one-time verification pass-code to sign into your developer and student account:
                  </td>
                </tr>

                <!-- OTP Code Box -->
                <tr>
                  <td align="center" style="padding-bottom: 32px;">
                    <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(6, 182, 212, 0.12)); border: 2px dashed rgba(99, 102, 241, 0.5); border-radius: 16px; padding: 20px 32px; display: inline-block;">
                      <span style="font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #38bdf8; font-family: monospace;">
                        ${code}
                      </span>
                    </div>
                  </td>
                </tr>

                <!-- Expiry details -->
                <tr>
                  <td align="center" style="padding-bottom: 24px; color: #cbd5e1; font-size: 13px; line-height: 1.5;">
                    ⏳ This code is valid for <strong>10 minutes</strong>. Do not share this code with anyone.
                  </td>
                </tr>

                <!-- Security warning -->
                <tr>
                  <td style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 24px; color: #64748b; font-size: 12px; line-height: 1.5; text-align: center;">
                    If you did not request this login code, you can safely disregard this email. Your account remains fully secure.
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    return false;
  }
}
