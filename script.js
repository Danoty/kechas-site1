document.documentElement.classList.add('js');
// year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


// service worker (offline + faster repeat visits)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}

// theme (persist)
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

const themeBtn = document.getElementById("themeBtn");
themeBtn?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  if (next === "light") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", next);
});

// mobile menu
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn?.addEventListener("click", () => menu?.classList.toggle("show"));
menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu?.classList.remove("show")));

// reveal on scroll
const revealEls = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// lightbox (fleet images)
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("lightboxClose");

document.querySelectorAll("[data-lightbox='fleet']").forEach(img => {
  img.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = img.getAttribute("src");
    lightbox.classList.add("show");
  });
});

function closeLightbox(){
  lightbox?.classList.remove("show");
  if (lightboxImg) lightboxImg.src = "";
}
closeBtn?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

// WhatsApp form
window.sendWhatsApp = function sendWhatsApp(e){
  e.preventDefault();
  const name = document.getElementById("name")?.value || "";
  const phone = document.getElementById("phone")?.value || "";
  const msg = document.getElementById("msg")?.value || "";

  const text = encodeURIComponent(
    `Hello Kechas Agencies,\nName: ${name}\nPhone: ${phone}\nRequest: ${msg}`
  );
  window.open(`https://wa.me/254722403413?text=${text}`, "_blank");
};

// Testimonials slider
(function(){
  const track = document.getElementById("tTrack");
  if (!track) return;
  const prev = document.getElementById("tPrev");
  const next = document.getElementById("tNext");
  let index = 0;

  const items = Array.from(track.children);
  function step(){
    const itemW = items[0]?.getBoundingClientRect().width || 340;
    const gap = 14;
    track.style.transform = `translateX(${-index*(itemW+gap)}px)`;
  }
  next?.addEventListener("click", () => { index = Math.min(index+1, items.length-1); step(); });
  prev?.addEventListener("click", () => { index = Math.max(index-1, 0); step(); });
  window.addEventListener("resize", step);
})();

// Fleet filters
(function(){
  const buttons = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-cat]"));
  if (!buttons.length || !cards.length) return;

  function setActive(btn){
    buttons.forEach(b => b.classList.toggle("active", b === btn));
    const cat = btn.getAttribute("data-filter");
    cards.forEach(c => {
      const ok = cat === "all" || c.getAttribute("data-cat") === cat;
      c.style.display = ok ? "" : "none";
    });
  }

  buttons.forEach(btn => btn.addEventListener("click", () => setActive(btn)));
  setActive(buttons[0]);
})();

// i18n (EN/SW) - static site translation
const i18n = {
  en: {
    "nav.home":"Home","nav.about":"About","nav.services":"Services","nav.fleet":"Fleet","nav.clients":"Clients","nav.blog":"News","nav.gallery":"Gallery","nav.pricing":"Pricing","nav.faq":"FAQ","nav.locations":"Locations","nav.policies":"Policies","nav.loyalty":"Loyalty","nav.contact":"Contact",
    "blog.title":"News & Travel Tips","blog.subtitle":"Updates, travel advice, and announcements.",
    "blog.tag.update":"Update","blog.tag.tip":"Tip","blog.tag.safety":"Safety",
    "blog.p1.t":"New routes & faster pickups","blog.p1.b":"We’re optimizing routes for Kisumu, Nairobi and western Kenya to reduce delays and improve punctuality.",
    "blog.p2.t":"Airport transfer checklist","blog.p2.b":"Share flight number, baggage size, pickup point and contact number to ensure a smooth transfer.",
    "blog.p3.t":"Emergency readiness on every trip","blog.p3.b":"Our safety practices include pre-trip checks, communication protocols and first-aid readiness.",
    "blog.note.h":"Want us to post real updates?","blog.note.b":"Send your announcements, promotions, or travel tips and we’ll publish them here.",

    "gallery.title":"Tours Gallery","gallery.subtitle":"A visual preview of trips, tours and private hire experiences.","gallery.cta":"Request a Tour Quote",
    "gallery.note.h":"How to add photos:","gallery.note.b":"Upload images into assets/stock and name them tour1.jpg ... tour12.jpg. They will display automatically.",
    "gallery.filter.all":"All","gallery.filter.safari":"Safari","gallery.filter.city":"City","gallery.filter.luxury":"Luxury",
    "gallery.note2.h":"Need 1, 2, 3 added?","gallery.note2.b":"Send your tour types (1, 2, 3) and we’ll structure them as packages with itinerary highlights.",
    "pricing.title":"Pricing","pricing.subtitle":"Transparent pricing framework. Final quotes depend on route, duration, passengers and vehicle type.","pricing.cta":"Get a Quote",
    "pricing.from":"From:","pricing.varies":"Varies by distance","pricing.varies2":"Varies by itinerary",
    "pricing.b1.tag":"Corporate","pricing.b1.t":"Executive Day Hire","pricing.b1.b":"Ideal for meetings, conferences and business errands.",
    "pricing.b1.f1":"Professional chauffeur","pricing.b1.f2":"Flexible stops","pricing.b1.f3":"Corporate invoicing",
    "pricing.b2.tag":"Transfers","pricing.b2.t":"Airport Transfers","pricing.b2.b":"Reliable pickups with flight tracking and wait-time buffer.",
    "pricing.b2.f1":"Meet & greet","pricing.b2.f2":"Comfort-first vehicles","pricing.b2.f3":"24/7 support",
    "pricing.b3.tag":"Tours","pricing.b3.t":"Safari & Excursions","pricing.b3.b":"Curated trips with route planning and safety-first operations.",
    "pricing.b3.f1":"Custom itineraries","pricing.b3.f2":"Group options","pricing.b3.f3":"Emergency readiness",
    "pricing.how.t":"How quotes are calculated","pricing.how.a":"Distance & duration","pricing.how.ab":"Kilometers, time on road, waiting time.",
    "pricing.how.b":"Vehicle class","pricing.how.bb":"Executive, group transport, tour-ready options.",
    "pricing.how.c":"Passengers & luggage","pricing.how.cb":"Seating capacity and luggage requirements.",
    "pricing.note.h":"Fastest way:","pricing.note.b":"Use WhatsApp and share date, pickup point, destination, passengers, and vehicle preference.",
    "faq.title":"Frequently Asked Questions","faq.subtitle":"Everything clients ask most — bookings, payments, safety, and tours.","faq.cta":"Ask a Question",
    "faq.section.booking":"Bookings","faq.section.payments":"Payments","faq.section.safety":"Safety","faq.section.tours":"Tours & Trips",
    "faq.q1":"How do I book?","faq.a1":"Use Contact page, WhatsApp, or call. Share date, pickup point, destination, passengers, and vehicle type.",
    "faq.q2":"Can I book for a group?","faq.a2":"Yes. Tell us the number of passengers and luggage, and we’ll recommend the right vehicle.",
    "faq.q3":"Do you operate outside Kisumu?","faq.a3":"Yes. We operate across Kenya depending on trip requirements.",
    "faq.q4":"How do I pay?","faq.a4":"Payments can be arranged via agreed methods (mobile money/bank transfer). We confirm details during booking.",
    "faq.q5":"Can you invoice organizations?","faq.a5":"Yes. Corporate invoicing is available for organizations and projects.",
    "faq.q6":"Do prices change?","faq.a6":"Prices depend on route, duration, passengers, and vehicle class. We always confirm a quote first.",
    "faq.q7":"What safety measures do you follow?","faq.a7":"Pre-trip checks, clear communication, experienced chauffeurs, and first-aid readiness.",
    "faq.q8":"What happens in an emergency?","faq.a8":"We follow incident procedures and coordinate assistance. Share special requirements during booking.",
    "faq.q9":"Do you support VIP clients?","faq.a9":"Yes. We provide privacy-first, professional service for executive travel.",
    "faq.q10":"Do you plan itineraries?","faq.a10":"Yes. We help plan routes and timing for tours and excursions.",
    "faq.q11":"Can I customize a tour?","faq.a11":"Absolutely. Tell us your destinations, dates, and preferences.",
    "faq.q12":"Where can I see tour photos?","faq.a12":"Visit the Gallery page for tours, trips and experiences.",
    "faq.note.h":"Want more FAQs?","faq.note.b":"Send your top questions and I’ll add them here in a structured way.",


    "contact.emailform.h":"Send a Request (Email)",
    "contact.emailform.sub":"Use this form to email us. (Requires Formspree setup.)",
    "contact.emailform.btn":"Send Email"
  },
  sw: {
    "nav.home":"Mwanzo","nav.about":"Kuhusu","nav.services":"Huduma","nav.fleet":"Magari","nav.clients":"Wateja","nav.blog":"Habari","nav.gallery":"Picha","nav.pricing":"Bei","nav.faq":"Maswali","nav.locations":"Maeneo","nav.policies":"Sera","nav.loyalty":"Uaminifu","nav.contact":"Wasiliana",
    "blog.title":"Habari na Vidokezo vya Safari","blog.subtitle":"Taarifa, ushauri wa safari, na matangazo.",
    "blog.tag.update":"Taarifa","blog.tag.tip":"Kidokezo","blog.tag.safety":"Usalama",
    "blog.p1.t":"Njia mpya na kuchukua haraka","blog.p1.b":"Tuna boresha ratiba za njia Kisumu, Nairobi na magharibi mwa Kenya ili kupunguza kuchelewa.",
    "blog.p2.t":"Orodha ya uhamisho wa uwanja wa ndege","blog.p2.b":"Tuma namba ya safari ya ndege, mzigo, mahali pa kuchukuliwa na namba ya mawasiliano kwa uhamisho mzuri.",
    "blog.p3.t":"Utaratibu wa dharura kila safari","blog.p3.b":"Tunafuata ukaguzi wa kabla ya safari, mawasiliano, na maandalizi ya huduma ya kwanza.",
    "blog.note.h":"Unataka tuweke taarifa halisi?","blog.note.b":"Tuma matangazo, promosheni au vidokezo vya safari tuviweke hapa.",

    "gallery.title":"Matunzio ya Picha za Safari","gallery.subtitle":"Muonekano wa picha za safari, ziara na ukodishaji binafsi.","gallery.cta":"Omba Nukuu ya Ziara",
    "gallery.note.h":"Jinsi ya kuongeza picha:","gallery.note.b":"Pakia picha kwenye assets/stock na uziteue tour1.jpg ... tour12.jpg. Zitaonekana moja kwa moja.",
    "gallery.filter.all":"Zote","gallery.filter.safari":"Safari","gallery.filter.city":"Mji","gallery.filter.luxury":"Anasa",
    "gallery.note2.h":"Unataka 1, 2, 3 ziongezwe?","gallery.note2.b":"Tuma aina zako za ziara (1, 2, 3) na tutazipanga kama vifurushi.",
    "pricing.title":"Bei","pricing.subtitle":"Muundo wa bei ulio wazi. Nukuu ya mwisho hutegemea njia, muda, abiria na aina ya gari.","pricing.cta":"Pata Nukuu",
    "pricing.from":"Kuanzia:","pricing.varies":"Hutofautiana kwa umbali","pricing.varies2":"Hutegemea ratiba",
    "pricing.b1.tag":"Biashara","pricing.b1.t":"Ukodishaji wa Siku (Executive)","pricing.b1.b":"Inafaa kwa mikutano, warsha na shughuli za kazi.",
    "pricing.b1.f1":"Dereva mtaalamu","pricing.b1.f2":"Vituo vya kusimama vinavyobadilika","pricing.b1.f3":"Ankara kwa taasisi",
    "pricing.b2.tag":"Uhamisho","pricing.b2.t":"Uwanja wa Ndege","pricing.b2.b":"Kuchukua kwa uhakika na ufuatiliaji wa safari za ndege.",
    "pricing.b2.f1":"Kukutana na mteja","pricing.b2.f2":"Magari ya starehe","pricing.b2.f3":"Msaada 24/7",
    "pricing.b3.tag":"Ziara","pricing.b3.t":"Safari na Matembezi","pricing.b3.b":"Ziara zilizopangwa kwa usalama na mipango ya njia.",
    "pricing.b3.f1":"Ratiba maalum","pricing.b3.f2":"Chaguo la kundi","pricing.b3.f3":"Utayari wa dharura",
    "pricing.how.t":"Jinsi tunavyokokotoa nukuu","pricing.how.a":"Umbali na muda","pricing.how.ab":"Kilomita, muda barabarani, muda wa kusubiri.",
    "pricing.how.b":"Aina ya gari","pricing.how.bb":"Executive, kundi, na chaguo za ziara.",
    "pricing.how.c":"Abiria na mizigo","pricing.how.cb":"Idadi ya viti na mizigo.",
    "pricing.note.h":"Njia ya haraka:","pricing.note.b":"Tumia WhatsApp na tuma tarehe, mahali pa kuchukua, unakoenda, abiria na aina ya gari.",
    "faq.title":"Maswali Yanayoulizwa Mara kwa Mara","faq.subtitle":"Maswali ya kawaida — kuweka nafasi, malipo, usalama na ziara.","faq.cta":"Uliza Swali",
    "faq.section.booking":"Kuweka Nafasi","faq.section.payments":"Malipo","faq.section.safety":"Usalama","faq.section.tours":"Ziara na Safari",
    "faq.q1":"Ninawezaje kuweka nafasi?","faq.a1":"Tumia ukurasa wa Wasiliana, WhatsApp au piga simu. Tuma tarehe, mahali pa kuchukua, unakoenda, abiria na aina ya gari.",
    "faq.q2":"Naweza kuweka nafasi ya kundi?","faq.a2":"Ndiyo. Tueleze idadi ya abiria na mizigo, tutashauri gari sahihi.",
    "faq.q3":"Mnatoa huduma nje ya Kisumu?","faq.a3":"Ndiyo. Tunatoa huduma kote Kenya kulingana na mahitaji.",
    "faq.q4":"Ninalipaje?","faq.a4":"Malipo hupangwa kwa njia zinazokubaliwa (M-Pesa/benki). Tunathibitisha wakati wa kuweka nafasi.",
    "faq.q5":"Mnaweza kutoa ankara kwa taasisi?","faq.a5":"Ndiyo. Tunatoa ankara kwa taasisi na miradi.",
    "faq.q6":"Je, bei hubadilika?","faq.a6":"Bei hutegemea njia, muda, abiria na aina ya gari. Tunathibitisha nukuu kwanza.",
    "faq.q7":"Mnafuata hatua gani za usalama?","faq.a7":"Ukaguzi wa kabla ya safari, mawasiliano, madereva wenye uzoefu na utayari wa huduma ya kwanza.",
    "faq.q8":"Nini hutokea dharura ikitokea?","faq.a8":"Tunafuata taratibu za matukio na kuratibu msaada. Tuma mahitaji maalum wakati wa kuweka nafasi.",
    "faq.q9":"Mnasaidia wateja wa VIP?","faq.a9":"Ndiyo. Tunatoa huduma ya faragha na ya kitaalamu kwa wasafiri wa kiutendaji.",
    "faq.q10":"Mnasaidia kupanga ratiba?","faq.a10":"Ndiyo. Tunasaidia kupanga njia na muda wa ziara.",
    "faq.q11":"Naweza kubinafsisha ziara?","faq.a11":"Kabisa. Tueleze maeneo, tarehe na mapendeleo.",
    "faq.q12":"Naona wapi picha za ziara?","faq.a12":"Tembelea ukurasa wa Matunzio ya Picha.",
    "faq.note.h":"Unataka maswali zaidi?","faq.note.b":"Tuma maswali yako na nitaongeza hapa kwa mpangilio.",


    "contact.emailform.h":"Tuma Ombi (Barua Pepe)",
    "contact.emailform.sub":"Tumia fomu hii kututumia barua pepe. (Inahitaji Formspree.)",
    "contact.emailform.btn":"Tuma Barua Pepe"
  }
};

function applyLang(lang){
  const dict = i18n[lang] || i18n.en;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
}

const langBtn = document.getElementById("langBtn");
const savedLang = localStorage.getItem("lang") || "en";
applyLang(savedLang);

langBtn?.addEventListener("click", () => {
  const current = localStorage.getItem("lang") || "en";
  const next = current === "en" ? "sw" : "en";
  localStorage.setItem("lang", next);
  applyLang(next);
});


<br><br>
  Click WhatsApp to confirm your booking.`;
});


// Enterprise Booking (WhatsApp + Formspree Email)
const bookingForm = document.getElementById("bookingForm");

bookingForm?.addEventListener("submit", function(e){
  e.preventDefault();

  const pickup = document.getElementById("pickup")?.value || "";
  const dropoff = document.getElementById("dropoff")?.value || "";
  const vehicle = document.getElementById("vehicle")?.value || "";
  const date = document.getElementById("date")?.value || "";
  const passengers = document.getElementById("passengers")?.value || "";

  const msg =
`Hello Kechas Agencies,
Booking Request:

Pickup: ${pickup}
Dropoff: ${dropoff}
Vehicle: ${vehicle}
Date: ${date}
Passengers: ${passengers}

Kindly confirm availability and total cost.`;

  // WhatsApp
  const waNumber = "254722403413";
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  const waBtn = document.getElementById("bookWhatsApp");
  if (waBtn) waBtn.href = waLink;

  // Email via Formspree
  const emailInput = document.getElementById("bookingEmailMessage");
  const emailForm = document.getElementById("bookingEmailForm");

  document.getElementById("bookEmailSend")?.addEventListener("click", () => {
    if(emailInput && emailForm){
      emailInput.value = msg;
      emailForm.submit();
    }
  });

  const result = document.getElementById("bookingResult");
  if(result){
    result.style.display = "block";
    result.innerHTML = "<strong>Booking ready.</strong> Choose WhatsApp or Email to send now.";
  }
});

// Enterprise Booking (WhatsApp + Email)
// - WhatsApp: always works
// - Email: uses Formspree if configured; otherwise opens user's email app (mailto fallback)
(function(){
  const bookingForm = document.getElementById("bookingForm");
  if (!bookingForm) return;

  const waBtn = document.getElementById("bookWhatsApp");
  const emailBtn = document.getElementById("bookEmailSend");
  const result = document.getElementById("bookingResult");

  const waNumber = "254722403413";
  const emailTo = "kesachagencies@gmail.com";

  function buildMessage(){
    const pickup = document.getElementById("pickup")?.value || "";
    const dropoff = document.getElementById("dropoff")?.value || "";
    const vehicle = document.getElementById("vehicle")?.value || "";
    const date = document.getElementById("date")?.value || "";
    const passengers = document.getElementById("passengers")?.value || "";

    return `Hello Kechas Agencies,
Booking Request:

Pickup: ${pickup}
Dropoff: ${dropoff}
Vehicle: ${vehicle}
Date: ${date}
Passengers: ${passengers}

Kindly confirm availability and total cost.`;
  }

  function isFormspreeConfigured(){
    const form = document.getElementById("bookingEmailForm");
    const action = form?.getAttribute("action") || "";
    return action.includes("formspree.io/f/") && !action.includes("YOUR_FORM_ID");
  }

  bookingForm.addEventListener("submit", function(e){
    e.preventDefault();
    const msg = buildMessage();

    // WhatsApp link
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    if (waBtn) waBtn.href = waLink;

    // Show result
    if (result){
      result.style.display = "block";
      result.innerHTML = "<strong>Booking ready.</strong> Use WhatsApp or Email to send now.";
    }

    // Store msg for email click
    bookingForm.dataset.msg = msg;
  });

  // Email send handler (single listener)
  emailBtn?.addEventListener("click", () => {
    const msg = bookingForm.dataset.msg || buildMessage();

    if (isFormspreeConfigured()){
      const emailInput = document.getElementById("bookingEmailMessage");
      const emailForm = document.getElementById("bookingEmailForm");
      if (emailInput && emailForm){
        emailInput.value = msg;
        emailForm.submit();
      }
      return;
    }

    // Fallback: mailto (opens user's email app)
    const subject = "Booking Request - Kechas Agencies";
    const mailto = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
    window.location.href = mailto;
  });
})();

// Premium mobile nav toggle
(function () {
  const btn = document.getElementById("navToggle");
  const menu = document.getElementById("navLinks");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // close on link click (mobile)
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  // close when clicking outside
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  });
})();


/* Enterprise-style booking: send to WhatsApp + open Email draft */
(function(){
  const form = document.getElementById("bookingFormEnterprise");
  if(!form) return;

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const pickup = encodeURIComponent(data.get("pickup") || "");
    const dropoff = encodeURIComponent(data.get("dropoff") || "");
    const date = encodeURIComponent(data.get("date") || "");
    const time = encodeURIComponent(data.get("time") || "");
    const passengers = encodeURIComponent(data.get("passengers") || "");
    const vehicle = encodeURIComponent(data.get("vehicle") || "Any");
    const message = encodeURIComponent(data.get("message") || "");

    const text =
      `Hello Kechas Agencies,%0A` +
      `Pickup: ${pickup}%0A` +
      `Destination: ${dropoff}%0A` +
      `Date/Time: ${date} ${time}%0A` +
      `Passengers: ${passengers}%0A` +
      `Vehicle: ${vehicle}%0A` +
      (message ? `Request: ${message}%0A` : "") +
      `Please confirm availability and share the quote.`;

    // WhatsApp
    const whatsappNumber = "254722403413";
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");

    // Email draft
    const subject = encodeURIComponent("Booking Request - Kechas Agencies");
    const body =
      `Hello Kechas Agencies,%0D%0A%0D%0A` +
      `Pickup: ${decodeURIComponent(pickup)}%0D%0A` +
      `Destination: ${decodeURIComponent(dropoff)}%0D%0A` +
      `Date/Time: ${decodeURIComponent(date)} ${decodeURIComponent(time)}%0D%0A` +
      `Passengers: ${decodeURIComponent(passengers)}%0D%0A` +
      `Vehicle: ${decodeURIComponent(vehicle)}%0D%0A` +
      (decodeURIComponent(message) ? `Request: ${decodeURIComponent(message)}%0D%0A` : "") +
      `%0D%0APlease confirm availability and share the quote.%0D%0A`;

    window.location.href = `mailto:kesachagencies@gmail.com?subject=${subject}&body=${body}`;
  });
})();


// Email obfuscation
(function(){
  const links = Array.from(document.querySelectorAll('.js-email-link'));
  if (!links.length) return;
  links.forEach(a => {
    const user = a.getAttribute('data-user');
    const domain = a.getAttribute('data-domain');
    if (!user || !domain) return;
    const email = `${user}@${domain}`;
    a.href = `mailto:${email}`;
    if (!a.textContent || a.textContent.includes('[at]')) a.textContent = email;
  });
})();


/* -------------------------------------------------------
   World-class UX enhancements (lightweight, no deps)
--------------------------------------------------------*/
(function(){
  // Skip link + main target
  const header = document.querySelector("header");
  const firstMain = document.querySelector("main") || document.querySelector("[role='main']") ||
                    (header ? header.nextElementSibling : null);
  if (firstMain && !firstMain.id) firstMain.id = "main";
  if (!document.querySelector(".skip-link")) {
    const a = document.createElement("a");
    a.className = "skip-link";
    a.href = "#main";
    a.textContent = "Skip to content";
    document.body.prepend(a);
  }

  // Scroll progress
  const prog = document.createElement("div");
  prog.className = "scroll-progress";
  prog.innerHTML = "<span></span>";
  document.body.appendChild(prog);
  const bar = prog.querySelector("span");
  const updateProgress = () => {
    const h = document.documentElement;
    const max = Math.max(1, h.scrollHeight - h.clientHeight);
    const v = Math.min(1, Math.max(0, h.scrollTop / max));
    bar.style.transform = `scaleX(${v})`;
  };
  updateProgress();
  document.addEventListener("scroll", updateProgress, { passive:true });

  // Back to top
  const topBtn = document.createElement("button");
  topBtn.className = "to-top";
  topBtn.type = "button";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = "↑";
  document.body.appendChild(topBtn);
  topBtn.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
  const toggleTop = () => topBtn.classList.toggle("show", window.scrollY > 700);
  toggleTop();
  document.addEventListener("scroll", toggleTop, { passive:true });

  // Floating quick actions (Call / WhatsApp / Email)
  if (!document.querySelector(".fab")) {
    const fab = document.createElement("div");
    fab.className = "fab";
    fab.innerHTML = `
      <button class="fab-btn" type="button" aria-expanded="false" aria-label="Quick actions">✦</button>
      <div class="fab-menu" aria-hidden="true">
        <a class="fab-item" href="tel:+254722403413" aria-label="Call 0722 403 413">📞 Call</a>
        <a class="fab-item" href="https://wa.me/254722403413" target="_blank" rel="noopener" aria-label="WhatsApp">💬 WhatsApp</a>
        <a class="fab-item js-email-link" data-user="kesachagencies" data-domain="gmail.com" href="#" aria-label="Email">✉️ Email</a>
      </div>`;
    document.body.appendChild(fab);

    const btn = fab.querySelector(".fab-btn");
    const menu = fab.querySelector(".fab-menu");
    const close = () => {
      btn.setAttribute("aria-expanded","false");
      menu.setAttribute("aria-hidden","true");
      fab.classList.remove("open");
    };
    btn.addEventListener("click", () => {
      const open = !fab.classList.contains("open");
      fab.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
    });
    document.addEventListener("click", (e) => {
      if (!fab.contains(e.target)) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // Email de-obfuscation / click handler
  document.querySelectorAll(".js-email-link").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const user = a.getAttribute("data-user");
      const domain = a.getAttribute("data-domain");
      if (!user || !domain) return;
      const addr = `${user}@${domain}`;
      window.location.href = `mailto:${addr}`;
    });
  });

  // Improve lightbox accessibility (ESC, focus)
  const lb = document.getElementById("lightbox");
  const lbClose = document.getElementById("lightboxClose");
  if (lb){
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lb.classList.contains("show")) lbClose?.click();
    });
  }
})();


// ---------- Premium UX additions (progress, back-to-top, action dock, quote modal) ----------
(function(){
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll progress bar
  function ensureProgressBar(){
    if (document.getElementById("scrollProgress")) return;
    const bar = document.createElement("div");
    bar.id = "scrollProgress";
    bar.setAttribute("aria-hidden","true");
    document.body.appendChild(bar);

    const update = () => {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(1, Math.max(0, (window.scrollY || doc.scrollTop) / max));
      bar.style.transform = `scaleX(${pct})`;
    };
    update();
    window.addEventListener("scroll", update, { passive:true });
    window.addEventListener("resize", update);
  }

  // Back to top
  function ensureBackToTop(){
    if (document.getElementById("backToTop")) return;
    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.type = "button";
    btn.className = "back-to-top";
    btn.setAttribute("aria-label","Back to top");
    btn.innerHTML = "↑";
    document.body.appendChild(btn);

    const toggle = () => {
      const show = (window.scrollY || document.documentElement.scrollTop) > 700;
      btn.classList.toggle("show", show);
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive:true });
    btn.addEventListener("click", () => window.scrollTo({ top:0, behavior: prefersReduced ? "auto":"smooth" }));
  }

  // Action dock (WhatsApp / Call / Quote)
  function ensureActionDock(){
    if (document.getElementById("actionDock")) return;

    const phone = "+254722403413";
    const tel = "tel:+254722403413";

    const wrap = document.createElement("div");
    wrap.id = "actionDock";
    wrap.className = "action-dock";

    wrap.innerHTML = `
      <button type="button" class="dock-fab" aria-haspopup="dialog" aria-expanded="false" aria-controls="dockPanel" id="dockFab">
        <span class="dock-fab__spark" aria-hidden="true"></span>
        <span class="dock-fab__label">Quick actions</span>
        <span class="dock-fab__icon" aria-hidden="true">✦</span>
      </button>
      <div class="dock-panel" id="dockPanel" role="dialog" aria-label="Quick actions">
        <a class="dock-item" href="https://wa.me/254722403413" target="_blank" rel="noopener" aria-label="WhatsApp Kechas Agencies">
          <span aria-hidden="true">💬</span><span>WhatsApp</span>
        </a>
        <a class="dock-item" href="${tel}" aria-label="Call Kechas Agencies">
          <span aria-hidden="true">📞</span><span>Call</span>
        </a>
        <button class="dock-item" type="button" id="openQuote" aria-label="Get a quote">
          <span aria-hidden="true">🧾</span><span>Get a quote</span>
        </button>
      </div>
    `;
    document.body.appendChild(wrap);

    const fab = wrap.querySelector("#dockFab");
    const panel = wrap.querySelector("#dockPanel");
    const openBtn = wrap.querySelector("#openQuote");

    function closeDock(){
      panel.classList.remove("show");
      fab.setAttribute("aria-expanded","false");
    }
    function toggleDock(){
      const next = !panel.classList.contains("show");
      panel.classList.toggle("show", next);
      fab.setAttribute("aria-expanded", String(next));
      if (next) panel.querySelector("a,button")?.focus();
    }

    fab.addEventListener("click", toggleDock);
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) closeDock();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDock();
    });

    openBtn.addEventListener("click", () => {
      closeDock();
      window.openQuoteModal?.();
    });
  }

  // Quote modal (prefilled WhatsApp message)
  function ensureQuoteModal(){
    if (document.getElementById("quoteModal")) return;

    const modal = document.createElement("div");
    modal.id = "quoteModal";
    modal.className = "modal";
    modal.setAttribute("role","dialog");
    modal.setAttribute("aria-modal","true");
    modal.setAttribute("aria-labelledby","quoteTitle");
    modal.setAttribute("hidden","");

    modal.innerHTML = `
      <div class="modal__backdrop" data-close="1"></div>
      <div class="modal__panel" role="document">
        <div class="modal__head">
          <h2 id="quoteTitle">Get a fast quote</h2>
          <button type="button" class="icon-btn" aria-label="Close" data-close="1">✕</button>
        </div>
        <p class="modal__sub">Fill this in once — we’ll open WhatsApp with a ready message.</p>

        <form class="quote-form" id="quoteForm">
          <div class="grid2">
            <label>
              <span>Your name</span>
              <input name="q_name" autocomplete="name" required placeholder="e.g., Daniel" />
            </label>
            <label>
              <span>Phone number</span>
              <input name="q_phone" autocomplete="tel" inputmode="tel" required placeholder="e.g., 07xx xxx xxx" />
            </label>
          </div>

          <div class="grid2">
            <label>
              <span>Service</span>
              <select name="q_service" required>
                <option value="" selected disabled>Select a service</option>
                <option>Airport Transfer</option>
                <option>Corporate Transport</option>
                <option>Car Hire / Rental</option>
                <option>Car Leasing</option>
                <option>Tour / Safari</option>
                <option>Chauffeur Service</option>
                <option>Logistics / Delivery</option>
              </select>
            </label>
            <label>
              <span>Date & time</span>
              <input name="q_datetime" type="datetime-local" />
            </label>
          </div>

          <div class="grid2">
            <label>
              <span>Pick-up location</span>
              <input name="q_pickup" autocomplete="street-address" required placeholder="e.g., Kisumu Airport" />
            </label>
            <label>
              <span>Destination</span>
              <input name="q_drop" required placeholder="e.g., CBD / Hotel / Office" />
            </label>
          </div>

          <label>
            <span>Extra details</span>
            <textarea name="q_notes" rows="3" placeholder="Passengers, luggage, vehicle preference, special requests…"></textarea>
          </label>

          <div class="modal__actions">
            <button type="submit" class="btn btn-primary shimmer">Open WhatsApp</button>
            <a class="btn btn-ghost" href="contact.html">Contact form</a>
          </div>

          <p class="fineprint">No account needed. Response typically within minutes (business hours).</p>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    let lastFocus = null;
    function open(){
      lastFocus = document.activeElement;
      modal.removeAttribute("hidden");
      modal.classList.add("show");
      document.body.classList.add("modal-open");
      modal.querySelector("input,select,textarea,button")?.focus();
    }
    function close(){
      modal.classList.remove("show");
      document.body.classList.remove("modal-open");
      window.setTimeout(()=> modal.setAttribute("hidden",""), prefersReduced ? 0 : 160);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    window.openQuoteModal = open;

    modal.addEventListener("click", (e) => {
      const closeEl = e.target.closest("[data-close='1']");
      if (closeEl) close();
    });
    document.addEventListener("keydown", (e) => {
      if (modal.hasAttribute("hidden")) return;
      if (e.key === "Escape") close();
      // simple focus trap
      if (e.key === "Tab"){
        const focusables = Array.from(modal.querySelectorAll("a,button,input,select,textarea,[tabindex]:not([tabindex='-1'])"))
          .filter(el => !el.hasAttribute("disabled"));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length-1];
        if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    });

    const form = modal.querySelector("#quoteForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const msg =
`Hello Kechas Agencies,
Name: ${data.get("q_name")}
Phone: ${data.get("q_phone")}
Service: ${data.get("q_service")}
Date/Time: ${data.get("q_datetime") || "—"}
Pick-up: ${data.get("q_pickup")}
Destination: ${data.get("q_drop")}
Details: ${data.get("q_notes") || "—"}
`;
      const text = encodeURIComponent(msg);
      window.open(`https://wa.me/254722403413?text=${text}`, "_blank", "noopener");
      close();
    });
  }

  // Active nav highlight (current page)
  function setActiveNav(){
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll("nav a[href]").forEach(a => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (!href || href.startsWith("http")) return;
      const normalized = href === "" ? "index.html" : href;
      a.classList.toggle("is-active", normalized === path || (path === "" && normalized === "index.html"));
    });
  }

  // Improve mobile menu: ESC closes, focus management
  function enhanceMenu(){
    const menuBtn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");
    if (!menuBtn || !menu) return;

    function close(){ menu.classList.remove("show"); menuBtn.setAttribute("aria-expanded","false"); }
    function open(){ menu.classList.add("show"); menuBtn.setAttribute("aria-expanded","true"); menu.querySelector("a")?.focus(); }

    menuBtn.setAttribute("aria-expanded", menu.classList.contains("show") ? "true":"false");
    menuBtn.addEventListener("click", () => (menu.classList.contains("show") ? close() : open()));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) close();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureProgressBar();
    ensureBackToTop();
    ensureActionDock();
    ensureQuoteModal();
    setActiveNav();
    enhanceMenu();
  });
})();
