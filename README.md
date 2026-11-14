# Tamish website

Marketing site for Tamish, the family organizer with a Benefits Finder built in.
It is static HTML with no build step. It is published to GitHub Pages at **https://tamish.app** by `.github/workflows/pages.yml` on every push to `main`.

## Files

- `index.html`: the whole page (HTML, CSS and a small script)
- `privacy.html` and `terms.html`: draft privacy policy and terms of use, styled by `assets/legal.css`
- `assets/`: logo files made from the supplied artwork (the navy mark and the navy and orange wordmarks), with white and orange recolours, the favicon, the Apple touch icon and the social share image (`og-image.png`)

Brand colours sampled from the logo: navy `#0D3161`, orange `#F99235`.

## The waitlist

Sign-ups go to Formspree (`https://formspree.io/f/mzerdoyb`), set in `data-endpoint` on the form in `index.html`. Each sign-up is emailed to the Formspree account owner and listed in the Formspree dashboard. A hidden `_gotcha` field catches simple spam bots.

### Changing the form service

The form does not save anything until you connect it. Until then, a visitor who submits sees "Sign-ups open very soon" and no address is stored.
To collect addresses, set `data-endpoint` on the form in `index.html` to any URL that accepts a JSON `POST` of `{"email": "...", "source": "tamish-website"}`. That can be a form service such as Formspree, Basin or Getform, or your own API:

```html
<form class="waitlist" id="waitlistForm" data-endpoint="https://formspree.io/f/your-id" novalidate>
```

## Check before launch

- The UK childcare example (eligibility rules and the "up to ≈ £7,500 a year" figure) is marked as illustrative. Check it against gov.uk before going live.
- When the apps are in the stores, replace the "Coming soon" badges with links to the store listings.
- Fill in the highlighted placeholders in `privacy.html` and `terms.html` (company name, address, contact email, hosting and email providers, governing law), remove the "Draft for review" notes, and have a lawyer review both.

## Hosting at tamish.app

1. **Turn on Pages:** Settings → Pages → Build and deployment → **Source: GitHub Actions**.
2. **DNS at your registrar** for `tamish.app`:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` record for `www`: `ade0605.github.io`
3. **Custom domain:** Settings → Pages → Custom domain: `tamish.app`, Save, then tick **Enforce HTTPS** once the certificate is issued (can take up to a day). `.app` domains only work over HTTPS.
4. Optional but recommended: verify the domain under your GitHub profile → Settings → Pages, so no one else can claim it.
