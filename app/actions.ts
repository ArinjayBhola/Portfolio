"use server";

import nodemailer from "nodemailer";

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
