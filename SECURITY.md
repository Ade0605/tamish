# Security policy

## Reporting a vulnerability

Please report security problems privately through GitHub:
**[Report a vulnerability](https://github.com/Ade0605/tamish/security/advisories/new)**.
Don't open a public issue for a security problem.

Tell us what you found, how to reproduce it, and what impact you think it has. We aim to reply within 5 working days and will keep you updated until it's fixed.

## Scope

- The website at https://tamish.app and this repository.
- The waitlist form, which sends email addresses to Formspree.

The Tamish app has not launched yet and is not covered here.

## How the site is protected

- **Static site:** there is no server code, database or login on tamish.app.
- **HTTPS only:** `.app` domains are on the browsers' HSTS preload list, so browsers never load the site over plain HTTP.
- **Content Security Policy:** every page allows scripts, styles, fonts and images only from tamish.app, and allows network requests only to Formspree from the home page. No inline scripts or styles are allowed.
- **No third parties:** fonts are self-hosted, and there are no analytics, ads or trackers.
- **Supply chain:** the deploy workflow pins every action to a commit SHA, runs with the least permissions it needs, and Dependabot proposes updates weekly.
