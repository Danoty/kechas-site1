# Kechas Agencies Website (GitHub Pages)

Upload all files to your repo root and enable GitHub Pages from the main branch.


## Email form (Formspree)
1. Create a free form at Formspree.
2. Replace `YOUR_FORM_ID` in `contact.html` with your real ID.

## Live chat (Tawk.to)
1. Create a free Tawk.to property.
2. Replace `YOUR_PROPERTY_ID/YOUR_WIDGET_ID` in the chat snippet (bottom of each page).

## Language toggle
EN/SW toggle is built-in and works offline (static). Edit translations in `script.js` under `i18n`.


## New pages
- Gallery: `gallery.html` (uses `assets/stock/tour1.jpg ... tour12.jpg`)
- Pricing: `pricing.html`
- FAQ mega-page: `faq.html`



## ✅ Email booking (Formspree) — final working setup (2 minutes)

This site is static (GitHub Pages), so direct-to-inbox email is done via **Formspree**.

### Step 1 — Create the form
1. Go to Formspree and create a free account
2. Create a new form
3. Copy your endpoint, it looks like:
   `https://formspree.io/f/abcdwxyz`

### Step 2 — Paste the endpoint into the website
Open `index.html` and find:

`<form id="bookingEmailForm" action="https://formspree.io/f/YOUR_FORM_ID" ...>`

Replace `YOUR_FORM_ID` with your real ID so it becomes e.g.:

`action="https://formspree.io/f/abcdwxyz"`

### Step 3 — Deploy
Commit/push to GitHub Pages. Test booking:
- Click **Generate Booking**
- Click **Send via Email** → it will go to your inbox

### Fallback (works even without Formspree)
If you do NOT set Formspree, the Email button automatically falls back to **mailto** (opens the user's email app).


## Contact Email
Primary email: kesachagencies@gmail.com
