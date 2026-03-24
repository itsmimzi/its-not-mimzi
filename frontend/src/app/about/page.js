export const metadata = {
  title: "About | It's not Mimzi",
};

export default function about() {
  return (
    <div className="about-container">

      <section className="section-wrapper-education">

        <div className="section-title">Education</div>

        <div className="item-wrapper">
          <div className="education-title"> Université du Québec en Outaouais, Canada </div>
          <div className="education-subtitle">
            B.Sc. in Computer Science
            <br /><i>2022-2025 </i>
          </div>
          <p className="item-description"> Relevant coursework: Data Structures & Algorithms, Software Design, Web Development, Databases, Artificial Intelligence.</p>
        </div>
        <div className="item-wrapper">
          <div className="education-title"> Sorbonne University Paris 6 (ex-UPMC), France</div>
          <div className="education-subtitle">
            M.Sc. in Chemistry
            <br /><i>2017-2019</i>
          </div>
          <p className="item-description">
            Major in Chemical Engineering and Chemical Risk Management.
            <br />Coursework on how to design, synthesize, and characterize materials at laboratory and industrial scales.
            <br />Evaluate the risks associated with chemical processes and define strategies to minimize them.</p>

          <div className="education-subtitle">
            B.Sc. in Chemistry
            <br /><i>2012-2016 </i>
          </div>
          <p className="item-description"></p>
        </div>
      </section>

      <section className="section-wrapper-work">

        <div className="section-title">Work</div>

        <div className="item-wrapper">
          <div className="work-title">Teaching Assistant - Discrete Mathematics</div>
          <div className="work-subtitle">
            UQO
            <br /><i>2023-2024</i>
          </div>
          <p className="item-description"> Strengthened students’ foundations in logic, set theory, and graph theory through interactive workshops and personalized
            support on assignments and exams. </p>
        </div>
        <div className="item-wrapper">
          <div className="work-title">Research Assistant - ULRIA lab. </div>
          <div className="work-subtitle">
            UQO
            <br /><i>2022-2023</i>
          </div>
          <p className="item-description">
            Under Pr. Omer Nguena Timo Landry (Ph.D), conducted a comparative evaluation of ML architectures (MLPs, LSTMs, GANs,
            Transformers/LLMs) to identify ideal use-case scenarios based on data type, memory needs, and expected output behavior.
            <br /> Applied learnings directly to capstone project by selecting an appropriate MLP architecture for tabular prediction tasks. </p>
        </div>
        <div className="item-wrapper">
          <div className="work-title">Regulatory Affairs Officer </div>
          <div className="work-subtitle">
            Groupe Big Fernand, France
            <br /><i>2019-2020</i>
          </div>
          <p className="item-description">
            Led regulatory compliance processes (validated 50+ ingredients, drafted 100+ technical and safety data sheets, reviewed
            marketing claims), reducing approval time by 30% (from 14 to 10 days) while ensuring 100% compliance.
            <br />Managed the regulatory database (updated 60+ product records) and coordinated 15+ hygiene and safety audits across the
            Île-de-France network with no major non-compliance findings. </p>
        </div>

        <div className="item-wrapper">
          <div className="work-title">Data Analyst - Dpt. of Nutritional Sciences </div>
          <div className="work-subtitle">
            Institut Agronomique et Vétérinaire Hassan II, Maroc
            <br /><i>Apr 2018 - Sep 2018</i>
          </div>
          <p className="item-description">
            Built a reproducible pipeline to clean and merge multisource lab datasets (GC, HPLC-UV, extraction assays) using Excel
            workflows including pivot models, lookup systems and structured tables.
            <br />Identified variables influencing yield and antioxidant content through regression analysis, ANOVA, correlation matrices, and
            outlier detection.
            <br />Delivered actionable insights to industrial partners (Morocco, Turkey, India), including optimized extraction conditions that
            improved yield by 4.5%. </p>
        </div>

        <div className="item-wrapper">
          <div className="work-title">Research Assistant - Dpt. of Inorganic Colloids, PHENIX lab. CNRS </div>
          <div className="work-subtitle">
            Sorbonne University Paris 6 (ex-UPMC), France
            <br /><i>Jan 2015 - Apr 2015</i>
          </div>
          <p className="item-description">
            Built a MATLAB predictive classification model to optimize gold nanoparticle
            synthesis for encapsulated drug delivery, using a 1500+ lab samples ETL data pipeline to identify key reaction parameters
            impacting different properties (magnetic and plasmonic).
            <br />Achieved 54%+ prediction accuracy and was offered a Master of Research position from the PHENIX research team. </p>
        </div>
      </section>

    </div>
  );
}
/*
'use client'
import { useState } from "react";


export default function about() {
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
      const res = await fetch("http://127.0.0.1:8000/api/contact/", {
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
  */