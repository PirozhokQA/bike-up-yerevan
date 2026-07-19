"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Check,
  ChevronDown,
  Clock3,
  Gauge,
  Heart,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { translations } from "./site-translations.js";

const programIcons = [Bike, ShieldCheck, Gauge, Sparkles];
const languageOptions = [
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
  { value: "hy", label: "Հայերեն" },
];

const asset = (path) => path.startsWith("data:")
  ? path
  : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <Mountain className="brand-mountain" />
      <Bike className="brand-bike" />
      <ArrowUpRight className="brand-rise" />
    </span>
  );
}

function scrollToForm() {
  document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [language, setLanguage] = useState("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("bike-up-language");
    if (savedLanguage && translations[savedLanguage]) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("bike-up-language", language);
  }, [language]);

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
    setMenuOpen(false);
    setOpenFaq(0);
  };

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={t.homeAria}>
          <BrandMark />
          <span className="brand-word"><span>BIKE</span><b>UP</b></span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label={t.navAria}>
          <a href="#programs" onClick={() => setMenuOpen(false)}>{t.nav.programs}</a>
          <a href="#prices" onClick={() => setMenuOpen(false)}>{t.nav.prices}</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>{t.nav.portfolio}</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>{t.nav.reviews}</a>
          <a href="#location" onClick={() => setMenuOpen(false)}>{t.nav.location}</a>
        </nav>
        <div className="header-actions">
          <label className="language-switcher">
            <Languages size={17} aria-hidden="true" />
            <span className="visually-hidden">{t.languageLabel}</span>
            <select value={language} onChange={changeLanguage} aria-label={t.languageLabel}>
              {languageOptions.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
            <ChevronDown className="language-chevron" size={15} aria-hidden="true" />
          </label>
          <button className="header-cta" onClick={scrollToForm}>{t.nav.signup} <ArrowRight size={18} /></button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.closeMenu : t.openMenu}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <img src={asset("images/hero-bike-school.webp")} alt={t.hero.alt} />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow"><MapPin size={16} /> {t.hero.eyebrow}</div>
          <h1>BIKE <span>UP</span></h1>
          <p className="hero-lead">{t.hero.lead}</p>
          <p className="hero-copy">{t.hero.copy}</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={scrollToForm}>{t.hero.choose} <ArrowRight size={19} /></button>
            <a className="text-link" href="#portfolio"><Play size={18} /> {t.hero.view}</a>
          </div>
        </div>
        <div className="hero-proof">
          {t.hero.proof.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section className="trust-band" aria-label={t.trustAria}>
        {[ShieldCheck, Target, Heart, MapPin].map((Icon, index) => <div key={t.trust[index][0]}><Icon /><span><b>{t.trust[index][0]}</b><small>{t.trust[index][1]}</small></span></div>)}
      </section>

      <section className="section" id="programs">
        <div className="section-heading">
          <div><span className="kicker">{t.programsSection.kicker}</span><h2>{t.programsSection.title}</h2></div>
          <p>{t.programsSection.text}</p>
        </div>
        <div className="program-grid">
          {t.programs.map((program, index) => {
            const Icon = programIcons[index];
            return (
            <article className="program-card" key={program.title}>
              <div className="program-top"><span className="number">0{index + 1}</span><span className="program-icon"><Icon /></span></div>
              <span className="card-label">{program.label}</span>
              <h3>{program.title}</h3>
              <p>{program.text}</p>
              <span className="program-meta"><Clock3 size={16} /> {program.meta}</span>
            </article>
            );
          })}
        </div>
      </section>

      <section className="method-band">
        <div className="method-copy">
          <span className="kicker light">{t.method.kicker}</span>
          <h2>{t.method.title}</h2>
          <p>{t.method.text}</p>
          <div className="method-steps">
            {t.method.steps.map((step, index) => <div key={step}><b>0{index + 1}</b><span>{step}</span></div>)}
          </div>
        </div>
        <figure className="method-image">
          <img src={asset("images/kids-training.webp")} alt={t.method.alt} />
          <figcaption><ShieldCheck size={20} /><span><b>{t.method.coach}</b> {t.method.coachText}</span></figcaption>
        </figure>
      </section>

      <section className="section" id="prices">
        <div className="section-heading compact">
          <div><span className="kicker">{t.pricesSection.kicker}</span><h2>{t.pricesSection.title}</h2></div>
          <p>{t.pricesSection.text}</p>
        </div>
        <div className="price-grid">
          {t.prices.map((price) => (
            <article className={price.featured ? "price-card featured" : "price-card"} key={price.title}>
              {price.featured && <span className="popular">{t.pricesSection.popular}</span>}
              <h3>{price.title}</h3>
              <p>{price.text}</p>
              <div className="price"><strong>{price.price}</strong><span>{price.unit}</span></div>
              <ul>{price.items.map(item => <li key={item}><Check size={17} /> {item}</li>)}</ul>
              <button onClick={scrollToForm}>{t.pricesSection.choose} <ArrowRight size={18} /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="section-heading inverse">
          <div><span className="kicker light">{t.portfolio.kicker}</span><h2>{t.portfolio.title}</h2></div>
          <p>{t.portfolio.text}</p>
        </div>
        <div className="portfolio-grid">
          <figure className="portfolio-main">
            <img src={asset("images/advanced-training.webp")} alt={t.portfolio.mainAlt} />
            <div className="play-badge"><Play fill="currentColor" /><span><b>{t.portfolio.lesson}</b><small>{t.portfolio.lessonMeta}</small></span></div>
          </figure>
          <figure><img src={asset("images/kids-training.webp")} alt={t.portfolio.kidsAlt} /><figcaption>{t.portfolio.kidsCaption}</figcaption></figure>
          <figure><img src={asset("images/hero-bike-school.webp")} alt={t.portfolio.groupAlt} /><figcaption>{t.portfolio.groupCaption}</figcaption></figure>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="section-heading compact">
          <div><span className="kicker">{t.reviewsSection.kicker}</span><h2>{t.reviewsSection.title}</h2></div>
          <div className="rating"><span>5.0</span><span className="stars">★★★★★</span><small>{t.reviewsSection.rating}</small></div>
        </div>
        <div className="reviews-grid">
          {t.reviews.map(review => <article className="review-card" key={review.name}><MessageCircle /><p>“{review.text}”</p><div><b>{review.name}</b><span>{review.meta}</span></div></article>)}
        </div>
      </section>

      <section className="location-band" id="location">
        <div className="location-map" aria-label={t.location.mapAria}>
          <span className="map-road r1" /><span className="map-road r2" /><span className="map-road r3" /><span className="map-road r4" />
          <span className="map-pin"><MapPin /><i>BIKE UP</i></span>
          <span className="map-label label-1">{t.location.labels[0]}</span><span className="map-label label-2">{t.location.labels[1]}</span><span className="map-label label-3">{t.location.labels[2]}</span>
        </div>
        <div className="location-copy">
          <span className="kicker">{t.location.kicker}</span>
          <h2>{t.location.title}</h2>
          <p>{t.location.text}</p>
          <div className="location-note"><MapPin /><span><b>{t.location.exact}</b><small>{t.location.exactText}</small></span></div>
          <button className="dark-button" onClick={scrollToForm}>{t.location.button} <ArrowRight size={18} /></button>
        </div>
      </section>

      <section className="section faq-section">
        <div><span className="kicker">{t.faqSection.kicker}</span><h2>{t.faqSection.title}</h2><p className="faq-intro">{t.faqSection.text}</p></div>
        <div className="faq-list">
          {t.faqs.map(([question, answer], index) => (
            <button className={openFaq === index ? "faq open" : "faq"} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} key={question} aria-expanded={openFaq === index}>
              <span>{question}</span><ChevronDown />
              <p>{answer}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="signup-section" id="signup">
        <div className="signup-copy">
          <span className="kicker light">{t.signup.kicker}</span>
          <h2>{t.signup.title}</h2>
          <p>{t.signup.text}</p>
          <div className="signup-points">{t.signup.points.map(point => <span key={point}><Check /> {point}</span>)}</div>
        </div>
        <form className="signup-form" onSubmit={submit}>
          {sent ? (
            <div className="success"><span><Check /></span><h3>{t.signup.successTitle}</h3><p>{t.signup.successText}</p><button type="button" onClick={() => setSent(false)}>{t.signup.again}</button></div>
          ) : (
            <>
              <div className="form-head"><h3>{t.signup.formTitle}</h3><span>{t.signup.duration}</span></div>
              <label>{t.signup.nameLabel}<input name="name" required placeholder={t.signup.namePlaceholder} /></label>
              <label>{t.signup.contactLabel}<input name="contact" required placeholder="+374 or @username" /></label>
              <div className="form-row">
                <label>{t.signup.studentLabel}<select name="student" defaultValue="" key={`student-${language}`}><option value="" disabled>{t.signup.select}</option>{t.signup.students.map(option => <option key={option}>{option}</option>)}</select></label>
                <label>{t.signup.levelLabel}<select name="level" defaultValue="" key={`level-${language}`}><option value="" disabled>{t.signup.select}</option>{t.signup.levels.map(option => <option key={option}>{option}</option>)}</select></label>
              </div>
              <label>{t.signup.goalLabel}<textarea name="goal" rows="3" placeholder={t.signup.goalPlaceholder} /></label>
              <button className="submit-button" type="submit">{t.signup.submit} <ArrowRight size={19} /></button>
              <small className="privacy">{t.signup.privacy}</small>
            </>
          )}
        </form>
      </section>

      <footer>
        <div className="footer-brand"><a className="brand" href="#top"><BrandMark /><span className="brand-word"><span>BIKE</span><b>UP</b></span></a><p>{t.footer.description.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p></div>
        <div><b>{t.footer.training}</b><a href="#programs">{t.nav.programs}</a><a href="#prices">{t.nav.prices}</a><a href="#portfolio">{t.footer.lessons}</a></div>
        <div><b>{t.footer.school}</b><a href="#reviews">{t.nav.reviews}</a><a href="#location">{t.nav.location}</a><a href="#signup">{t.nav.signup}</a></div>
        <div className="footer-place"><MapPin /><span><b>{t.footer.place}</b><small>{t.footer.placeText}</small></span></div>
        <p className="copyright">{t.footer.copyright}</p>
      </footer>
    </main>
  );
}
