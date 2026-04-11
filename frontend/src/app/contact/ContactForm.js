'use client'
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${base}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      setForm({ email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          inputMode="email"
        />
      </div>
      <div className="contact-field">
        <label htmlFor="subject">Subject</label>
        <select
          name="subject"
          id="subject"
          value={form.subject}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>Make a selection</option>
          <option>I&apos;d like to start a project</option>
          <option>I&apos;d like to ask a question</option>
          <option>I&apos;d like to make a proposal</option>
        </select>
      </div>
      <div className="contact-field">
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          rows="6"
          placeholder="I'd like to chat about…"
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="contact-submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
      {status === "success" && (
        <p className="contact-status contact-success">
          Thank you for your message, we usually respond within 48 hours!
        </p>
      )}
      {status === "error" && (
        <p className="contact-status contact-error">
          Something went wrong. Please try again in a moment.
        </p>
      )}
    </form>
  );
}
