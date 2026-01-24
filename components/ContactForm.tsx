/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { Loader2, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { sendEmail } from "../app/actions";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        success: false,
        message: "Please fill in all fields.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await sendEmail({
        user_name: formData.name,
        user_email: formData.email,
        message: formData.message,
      });

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Message sent! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Failed to send message.");
      }
    } catch (error: any) {
      console.error("Contact Form Error:", error);
      setSubmitStatus({
        success: false,
        message: error.message || "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="user_name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Example"
          className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="user_email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
          className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          rows={4}
          className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none disabled:opacity-50"
          disabled={isSubmitting}
          required
        />
      </div>

      {submitStatus && (
        <div className={`flex items-center gap-2 text-sm ${submitStatus.success ? "text-green-500" : "text-red-500"}`}>
          {submitStatus.success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {submitStatus.message}
        </div>
      )}

      <Button
        className="w-full h-12 text-base"
        disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="ml-2 w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
