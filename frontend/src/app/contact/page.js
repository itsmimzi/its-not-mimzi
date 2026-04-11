import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact | It's not Mimzi",
};

export default function ContactPage() {
  return (
    <main className="contact-container">
      <section className="contact-wrapper">
        <h1 className="contact-title">Let&apos;s Connect</h1>
        <p className="contact-intro">
          Questions, collaborations, or just saying hi — drop a note. You&apos;ll get
          a confirmation email, and a real reply usually within 48 hours.
        </p>
        <ContactForm />
      </section>
    </main>
  );
}
