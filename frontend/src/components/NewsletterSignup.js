'use client'
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!endpoint) {
      setStatus("unconfigured");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mag-newsletter">
      <div className="mag-newsletter-inner">
        <h2 className="mag-newsletter-title">Newsletters</h2>
        <p className="mag-newsletter-text">
          Slow ambition, honest notes from a career pivot, and the occasional project post-mortem — straight to your inbox.
        </p>
        <form className="mag-newsletter-form" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
        {status === "success" && (
          <p className="mag-newsletter-status mag-newsletter-success">
            You&apos;re in. Check your inbox for a confirmation.
          </p>
        )}
        {status === "error" && (
          <p className="mag-newsletter-status mag-newsletter-error">
            Something broke. Try again in a moment.
          </p>
        )}
        {status === "unconfigured" && (
          <p className="mag-newsletter-status mag-newsletter-error">
            Newsletter endpoint not configured yet.
          </p>
        )}
      </div>
    </section>
  );
}
