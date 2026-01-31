"use server";

import nodemailer from "nodemailer";
import { db } from "../lib/db/index";
import { visitors } from "../lib/db/schema";
import { eq, desc, inArray } from "drizzle-orm";

export async function sendEmail(formData: { user_name: string; user_email: string; message: string }) {
  const { user_name, user_email, message } = formData;

  if (!user_name || !user_email || !message) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: user_email,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission from ${user_name}`,
      text: `Name: ${user_name}\nEmail: ${user_email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return { success: false, message: "Failed to send email." };
  }
}

export async function getVisitors() {
  try {
    return await db.select().from(visitors).orderBy(desc(visitors.visitedAt));
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return [];
  }
}

export async function deleteVisitor(id: number) {
  try {
    await db.delete(visitors).where(eq(visitors.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting visitor:", error);
    return { success: false };
  }
}

export async function deleteVisitorsBulk(ids: number[]) {
  try {
    await db.delete(visitors).where(inArray(visitors.id, ids));
    return { success: true };
  } catch (error) {
    console.error("Error deleting visitors bulk:", error);
    return { success: false };
  }
}

export async function clearAllVisitors() {
  try {
    await db.delete(visitors);
    return { success: true };
  } catch (error) {
    console.error("Error clearing visitors:", error);
    return { success: false };
  }
}
