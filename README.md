# Tamish website

Marketing site for Tamish, the family organizer with a Benefits Finder built in.
It is static HTML. Cloudflare Pages publishes it at **https://tamish.app** on every push to `main` (see *Hosting on Cloudflare Pages* below).

## Files

- `index.html`: the home page
- `build.sh` and `_headers`: what Cloudflare Pages publishes, and the security headers it sends
- `privacy.html` and `terms.html`: draft privacy policy and terms of use, styled by `assets/legal.css`
- `assets/site.css`, `assets/main.js`, `assets/js-on.js` and `assets/fonts.css`: the home page's styles and scripts and the self-hosted fonts, kept out of the HTML so the Content Security Policy can forbid inline code
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


## Security

See [SECURITY.md](SECURITY.md) for how to report a problem and how the site is protected. Keep pages free of inline `<script>`, `<style>` and `style=""`: the Content Security Policy blocks them.

## Hosting on Cloudflare Pages

Cloudflare Pages builds the site from this repository on every push to `main` and sends the security headers in `_headers`.

- **Build command:** `sh build.sh`
- **Build output directory:** `_site`
- **Custom domains:** `tamish.app` and `www.tamish.app`

`build.sh` copies only the public files into `_site/`. Add any new public file or folder to it, or it won't be published.
