"use server";

import { Resend } from "resend";
import { site } from "@/content/site";

export type InquiryState =
  | { status: "success" }
  | { status: "error"; message: string }
  | null;

export async function sendInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot: bots fill the hidden "website" field; pretend success.
  if (formData.get("website")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message:
        "Please fill in your name, email, and a few words about the project.",
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message: "That email address doesn't look right — mind checking it?",
    };
  }

  if (message.length > 5000 || name.length > 200 || budget.length > 200) {
    return {
      status: "error",
      message: "That message is a little too long — mind trimming it down?",
    };
  }

  const safeName = name.replace(/[\r\n]+/g, " ").slice(0, 100);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      // onboarding@resend.dev works without domain verification;
      // switch to a verified applitechture.com sender when the domain is set up in Resend.
      from: "Applitechture website <onboarding@resend.dev>",
      to: site.email,
      replyTo: email,
      subject: `New project inquiry from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${email}\nBudget: ${budget || "not specified"}\n\n${message}`,
    });
    if (error) {
      return {
        status: "error",
        message: `Something went wrong sending your message. Email us directly at ${site.email}.`,
      };
    }
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: `Something went wrong sending your message. Email us directly at ${site.email}.`,
    };
  }
}
