"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Check,
  ChevronDown,
  Clock3,
  Gauge,
  Heart,
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

const programs = [
  { icon: Bike, label: "С нуля", title: "Первый уверенный старт", text: "Баланс, старт, торможение и повороты. Для детей и взрослых, которые ещё не ездят или боятся велосипеда.", meta: "от 2 занятий" },
  { icon: ShieldCheck, label: "Безопасность", title: "Управление в городе", text: "Экстренное торможение, объезд препятствий, контроль скорости и безопасные привычки для ежедневных поездок.", meta: "3–5 занятий" },
  { icon: Gauge, label: "Техника", title: "Продвинутое катание", text: "Повороты, подъёмы, спуски, перенос веса и уверенная езда по разному покрытию.", meta: "от 4 занятий" },
  { icon: Sparkles, label: "Новый уровень", title: "Трюки и препятствия", text: "Банни-хоп, мануал, бордюры и безопасная работа на памп-треке — постепенно и под контролем тренера.", meta: "по уровню" },
];

const prices = [
  { title: "Знакомство", price: "9 000 ֏", unit: "60 минут", text: "Диагностика навыков и первый заметный результат.", items: ["Индивидуально", "План обучения", "Подбор площадки"], featured: false },
  { title: "Уверенный старт", price: "32 000 ֏", unit: "4 занятия", text: "Оптимально, чтобы закрепить базовые навыки без спешки.", items: ["4 × 60 минут", "Личный тренер", "Домашние упражнения"], featured: true },
  { title: "Вместе", price: "7 000 ֏", unit: "с человека", text: "Для друзей, пары, братьев и сестёр одного уровня.", items: ["Группа 2–4 человека", "75 минут", "Общая цель занятия"], featured: false },
];

const reviews = [
  { name: "Анна, мама Левона", meta: "7 лет · курс с нуля", text: "На втором занятии Левон уже сам стартовал и тормозил. Больше всего понравилось, что тренер не торопил и объяснял всё как игру." },
  { name: "Мария", meta: "34 года · первый велосипед", text: "Я была уверена, что уже поздно учиться. Через три встречи спокойно проехала свой первый маршрут и перестала бояться поворотов." },
  { name: "Арман", meta: "28 лет · продвинутый уровень", text: "Разобрали технику по деталям. Банни-хоп наконец стал контролируемым движением, а не попыткой перепрыгнуть препятствие на удачу." },
];

const faqs = [
  ["Нужен ли свой велосипед?", "Желательно, чтобы навык сразу закреплялся на вашем велосипеде. Если его пока нет, подскажем подходящий вариант перед занятием."],
  ["Со скольких лет можно заниматься?", "Обычно начинаем с 4–5 лет, когда ребёнок уверенно понимает инструкции. Точный формат определим после короткого разговора."],
  ["Где проходят занятия?", "В Ереване: на спокойных ровных площадках, в парках и на тренировочных локациях. Место выбираем под навык и район ученика."],
  ["Что делать, если я боюсь падения?", "Это нормальная отправная точка. Начинаем с низкой скорости, безопасной экипировки и упражнений, где вы полностью контролируете велосипед."],
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="BIKE UP — на главную">
          <BrandMark />
          <span className="brand-word"><span>BIKE</span><b>UP</b></span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Основная навигация">
          <a href="#programs" onClick={() => setMenuOpen(false)}>Программы</a>
          <a href="#prices" onClick={() => setMenuOpen(false)}>Цены</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>Как проходят занятия</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Отзывы</a>
          <a href="#location" onClick={() => setMenuOpen(false)}>Локация</a>
        </nav>
        <button className="header-cta" onClick={scrollToForm}>Записаться <ArrowRight size={18} /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="top">
        <img src={asset("images/hero-bike-school.webp")} alt="Тренер BIKE UP проводит групповое занятие в Ереване" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow"><MapPin size={16} /> Школа велосипеда · Ереван</div>
          <h1>BIKE <span>UP</span></h1>
          <p className="hero-lead">Научим управлять велосипедом, а не просто держаться в седле.</p>
          <p className="hero-copy">Безопасные индивидуальные и групповые занятия для детей и взрослых — от первого старта до трюков и препятствий.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={scrollToForm}>Подобрать программу <ArrowRight size={19} /></button>
            <a className="text-link" href="#portfolio"><Play size={18} /> Посмотреть занятия</a>
          </div>
        </div>
        <div className="hero-proof">
          <div><strong>4+</strong><span>лет</span></div>
          <div><strong>1:1</strong><span>внимание тренера</span></div>
          <div><strong>100%</strong><span>в шлемах</span></div>
        </div>
      </section>

      <section className="trust-band" aria-label="Преимущества школы">
        <div><ShieldCheck /><span><b>Безопасная методика</b><small>от простого к сложному</small></span></div>
        <div><Target /><span><b>Видимый прогресс</b><small>цель на каждое занятие</small></span></div>
        <div><Heart /><span><b>Без давления</b><small>бережный темп ученика</small></span></div>
        <div><MapPin /><span><b>В Ереване</b><small>удобная площадка под уровень</small></span></div>
      </section>

      <section className="section" id="programs">
        <div className="section-heading">
          <div><span className="kicker">Направления</span><h2>От первого метра до нового уровня</h2></div>
          <p>Не привязываем всех к одной программе. Сначала смотрим, что уже получается, затем собираем понятный маршрут обучения.</p>
        </div>
        <div className="program-grid">
          {programs.map(({ icon: Icon, ...program }, index) => (
            <article className="program-card" key={program.title}>
              <div className="program-top"><span className="number">0{index + 1}</span><span className="program-icon"><Icon /></span></div>
              <span className="card-label">{program.label}</span>
              <h3>{program.title}</h3>
              <p>{program.text}</p>
              <span className="program-meta"><Clock3 size={16} /> {program.meta}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="method-band">
        <div className="method-copy">
          <span className="kicker light">Как мы учим</span>
          <h2>Спокойно. Понятно. По-настоящему.</h2>
          <p>Каждое занятие строится вокруг одной задачи. Тренер показывает движение, разбирает его на простые шаги и остаётся рядом, пока навык не станет уверенным.</p>
          <div className="method-steps">
            <div><b>01</b><span>Определяем уровень и цель</span></div>
            <div><b>02</b><span>Тренируем навык в безопасных условиях</span></div>
            <div><b>03</b><span>Закрепляем в реальном катании</span></div>
          </div>
        </div>
        <figure className="method-image">
          <img src={asset("images/kids-training.webp")} alt="Ребёнок проходит полосу препятствий рядом с тренером" />
          <figcaption><ShieldCheck size={20} /><span><b>Тренер рядом</b> на каждом новом элементе</span></figcaption>
        </figure>
      </section>

      <section className="section" id="prices">
        <div className="section-heading compact">
          <div><span className="kicker">Стоимость</span><h2>Прозрачные форматы занятий</h2></div>
          <p>Шлем обязателен. Защитную экипировку и велосипед обсудим перед первым занятием.</p>
        </div>
        <div className="price-grid">
          {prices.map((price) => (
            <article className={price.featured ? "price-card featured" : "price-card"} key={price.title}>
              {price.featured && <span className="popular">Чаще выбирают</span>}
              <h3>{price.title}</h3>
              <p>{price.text}</p>
              <div className="price"><strong>{price.price}</strong><span>{price.unit}</span></div>
              <ul>{price.items.map(item => <li key={item}><Check size={17} /> {item}</li>)}</ul>
              <button onClick={scrollToForm}>Выбрать <ArrowRight size={18} /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="section-heading inverse">
          <div><span className="kicker light">В движении</span><h2>Занятия, на которых хочется пробовать</h2></div>
          <p>Сначала контроль и техника. Скорость, сложность и эффектные элементы приходят следом.</p>
        </div>
        <div className="portfolio-grid">
          <figure className="portfolio-main">
            <img src={asset("images/advanced-training.webp")} alt="Ученик отрабатывает небольшой прыжок под контролем тренера" />
            <div className="play-badge"><Play fill="currentColor" /><span><b>Продвинутый урок</b><small>контроль препятствия</small></span></div>
          </figure>
          <figure><img src={asset("images/kids-training.webp")} alt="Детское занятие на баланс" /><figcaption>Баланс и точность</figcaption></figure>
          <figure><img src={asset("images/hero-bike-school.webp")} alt="Групповая тренировка" /><figcaption>Групповая практика</figcaption></figure>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="section-heading compact">
          <div><span className="kicker">Отзывы</span><h2>Уверенность заметна сразу</h2></div>
          <div className="rating"><span>5.0</span><span className="stars">★★★★★</span><small>по отзывам учеников</small></div>
        </div>
        <div className="reviews-grid">
          {reviews.map(review => <article className="review-card" key={review.name}><MessageCircle /><p>«{review.text}»</p><div><b>{review.name}</b><span>{review.meta}</span></div></article>)}
        </div>
      </section>

      <section className="location-band" id="location">
        <div className="location-map" aria-label="Схематичная карта Еревана">
          <span className="map-road r1" /><span className="map-road r2" /><span className="map-road r3" /><span className="map-road r4" />
          <span className="map-pin"><MapPin /><i>BIKE UP</i></span>
          <span className="map-label label-1">Кентрон</span><span className="map-label label-2">Арабкир</span><span className="map-label label-3">Ереван</span>
        </div>
        <div className="location-copy">
          <span className="kicker">Локация</span>
          <h2>Тренируемся в Ереване</h2>
          <p>Подбираем спокойную площадку под ваш район, возраст и уровень. Для продвинутых занятий используем подходящие парки и тренировочные зоны.</p>
          <div className="location-note"><MapPin /><span><b>Точное место</b><small>согласуем после записи</small></span></div>
          <button className="dark-button" onClick={scrollToForm}>Узнать ближайшую площадку <ArrowRight size={18} /></button>
        </div>
      </section>

      <section className="section faq-section">
        <div><span className="kicker">Вопросы</span><h2>Перед первым занятием</h2><p className="faq-intro">Если вашего вопроса нет в списке, оставьте заявку — ответим и поможем выбрать формат.</p></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <button className={openFaq === index ? "faq open" : "faq"} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} key={question} aria-expanded={openFaq === index}>
              <span>{question}</span><ChevronDown />
              <p>{answer}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="signup-section" id="signup">
        <div className="signup-copy">
          <span className="kicker light">Начнём с вашей цели</span>
          <h2>Первый уверенный метр начинается здесь</h2>
          <p>Расскажите, кто будет заниматься и что хочется освоить. Мы предложим программу, тренера и подходящую площадку в Ереване.</p>
          <div className="signup-points"><span><Check /> Ответим в течение дня</span><span><Check /> Без обязательств</span><span><Check /> План под ваш уровень</span></div>
        </div>
        <form className="signup-form" onSubmit={submit}>
          {sent ? (
            <div className="success"><span><Check /></span><h3>Заявка принята</h3><p>Спасибо! Мы свяжемся с вами, чтобы уточнить цель и подобрать занятие.</p><button type="button" onClick={() => setSent(false)}>Отправить ещё одну</button></div>
          ) : (
            <>
              <div className="form-head"><h3>Подобрать занятие</h3><span>2 минуты</span></div>
              <label>Как к вам обращаться?<input name="name" required placeholder="Ваше имя" /></label>
              <label>Телефон или Telegram<input name="contact" required placeholder="+374 или @username" /></label>
              <div className="form-row">
                <label>Кто будет заниматься?<select name="student" defaultValue=""><option value="" disabled>Выберите</option><option>Ребёнок</option><option>Взрослый</option><option>Двое или группа</option></select></label>
                <label>Текущий уровень<select name="level" defaultValue=""><option value="" disabled>Выберите</option><option>С нуля</option><option>Езжу, но неуверенно</option><option>Уверенно катаюсь</option><option>Хочу трюки</option></select></label>
              </div>
              <label>Что хочется освоить?<textarea name="goal" rows="3" placeholder="Например: научиться стартовать и тормозить" /></label>
              <button className="submit-button" type="submit">Отправить заявку <ArrowRight size={19} /></button>
              <small className="privacy">Нажимая кнопку, вы соглашаетесь на обработку данных для связи по заявке.</small>
            </>
          )}
        </form>
      </section>

      <footer>
        <div className="footer-brand"><a className="brand" href="#top"><BrandMark /><span className="brand-word"><span>BIKE</span><b>UP</b></span></a><p>Школа уверенного катания<br />для детей и взрослых.</p></div>
        <div><b>Обучение</b><a href="#programs">Программы</a><a href="#prices">Цены</a><a href="#portfolio">Занятия</a></div>
        <div><b>Школа</b><a href="#reviews">Отзывы</a><a href="#location">Локация</a><a href="#signup">Записаться</a></div>
        <div className="footer-place"><MapPin /><span><b>Ереван, Армения</b><small>занятия по предварительной записи</small></span></div>
        <p className="copyright">© 2026 BIKE UP. От первых метров до новых высот.</p>
      </footer>
    </main>
  );
}
