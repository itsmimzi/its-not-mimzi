/*export default function homepage() {
  return (
    <div className="home-container">
      <div className="intro-wrapper">
        <p className="intro-title">Hi, it's Mimzi.</p>
        <p className="intro-title"><b>Software Engineer</b></p>
        <p>
          I am a software engineer, ui/ux designer, product planner, problem solver, mentor, forever student, minimalist, eternal optimist.
        </p>
      </div>
      <div className="latest-post">

      </div>
    </div>
  );
}*/

'use client'
import { useState } from "react";


export default function homepage() {
  const [form, setForm] = useState({
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi...");
    try {
      /*const res = await fetch("http://127.0.0.1:8000/api/contact/", {*/
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Thank you for your message!")
      setStatus("Message successfully sent!");
      setForm({ email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Error! Check console log.");
    }
  };

  return (
    <div className="home-container">
      <div class="home-wrapper">
        <section>
          <div className="title-text">
            <div>Hi, it's Mimzi.</div>
            <br />
            <div>— though depending on the inbox, you might know me as Maryam (:</div>
          </div>
          <article>
            <p className="body-text">
              <i>Forever student</i>,
              <i> problem solver</i>,
              <i> half overthinker half dreamer</i>,
              <i> undying optimist.</i>
            </p>
            <p className="body-text">
              I began my academic and professional path in chemical engineering, drawn to complexity, structure, and systems thinking.
              Eventually, that curiosity led me to something equally intricate but infinitely more flexible: software.
              I made the leap from lab experiments to debugging code — and discovered that well-written logic can be just as elegant (and chaotic) as a reaction mechanism.
            </p>
            <p className="body-text">
              Today, I work at the intersection of
              🧠 Tech — I build smart tools to simplify real-life chaos
              📊 Data — I love making messy information meaningful
              🔍 Storytelling — because context matters more than credentials.<br />
              My work spans intelligent task schedulers, exploratory data projects, and reflective writing about what it's like to rebuild your career from the ground up. I’m not here to sell perfection — I’m more interested in the learning process, the pivot points, and the space between disciplines where creativity thrives.
              You won’t find 10-step productivity hacks here.<br />
              But you will find:
              Honest accounts of what it’s like to switch careers in your late twenties.
              Observations about tech culture, impostor syndrome, and the problem with buzzwords —
              projects that blend curiosity, functionality, and just a bit of stubbornness.
            </p>
            <p className="body-text">
              This site is a journal, a portfolio, and a public proof-of-work — all in one.
              If you’re into unpolished insights, slow ambition, and building without the buzzwords, welcome.<br />
              I’m glad you’re here.
            </p>
          </article>
        </section>
        <section className="connect-section">
          <p className="connect-title">
            Let's Connect
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="email">
              <label for="email"></label>
              <input
                type="email"
                placeholder="my e-mail is"
                name="email"
                id="email_input"
                value={form.email}
                onChange={handleChange}
                required />
            </div>
            <div class="subject">
              <label for="subject"></label>
              <select
                placeholder="Subject line"
                name="subject"
                id="subject_input"
                value={form.subject}
                onChange={handleChange}
                required>
                <option disabled hidden selected>make a selection</option>
                <option>I'd like to start a project</option>
                <option>I'd like to ask a question</option>
                <option>I'd like to make a proposal</option>
              </select>
            </div>
            <div className="message">
              <label for="message"></label>
              <textarea
                name="message"
                placeholder="I'd like to chat about"
                id="message_input"
                cols="30"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required></textarea>
            </div>
            <div className="submit">
              <input type="submit" id="form_button" value="Send Message" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
