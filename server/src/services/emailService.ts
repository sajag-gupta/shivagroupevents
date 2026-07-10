import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";

export interface LeadEmailData {
  name: string;
  phone: string;
  email?: string | null;
  eventType?: string | null;
  location?: string | null;
  eventDate?: string | null;
  guestCount?: number | null;
  budgetRange?: string | null;
  message?: string | null;
}

/**
 * Sends an email notification when a new lead is submitted.
 * Silently skips if SMTP credentials are not configured.
 */
export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const notifyEmail = process.env.NOTIFY_EMAIL ?? smtpUser;

  if (!smtpUser || !smtpPass || !notifyEmail) {
    logger.debug("SMTP not configured — skipping lead notification email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: 587,
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: `"Shiva Group Events Website" <${smtpUser}>`,
    to: notifyEmail,
    subject: `New Enquiry from ${lead.name} — ${lead.eventType ?? "General"}`,
    html: `
      <h2 style="color:#C9A227">New Lead — Shiva Group Events</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.name}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.phone}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.email ?? "—"}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Event Type</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.eventType ?? "—"}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Location</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.location ?? "—"}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Event Date</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.eventDate ?? "—"}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Guests</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.guestCount ?? "—"}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Budget</td><td style="padding:8px;border-bottom:1px solid #eee">${lead.budgetRange ?? "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px">${lead.message ?? "—"}</td></tr>
      </table>
      <p style="font-size:12px;color:#888;margin-top:16px">Received via Shiva Group Events website contact form.</p>
    `,
  });

  logger.info({ to: notifyEmail }, "Lead notification email sent");
}
