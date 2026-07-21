---
slug: bolao-copa
locale: en
description: 'A web app for football prediction pools — join a bolão, score fixtures, and climb the ranking with frictionless Google sign-in.'
problem: 'Casual prediction pools still run on spreadsheets and WhatsApp threads: no shared ranking, painful onboarding, and no durable product experience for tournament seasons.'
solution: 'A focused web product where friends join a pool, submit match predictions, and follow standings — with Google auth so participation starts in seconds instead of account forms.'
architecture: 'SPA/SSR web client with social authentication, match/fixture data, prediction submission and ranking views. Auth and pool state live behind a small backend surface suited to seasonal tournament traffic.'
challenges: 'Keeping onboarding near-zero friction while modeling pools, fixtures and scoring correctly across a tournament calendar — and shipping a UI that feels premium without overbuilding for a seasonal product.'
results: 'A live product at bolaodacopa.werlesson.dev: Google sign-in, prediction flow and ranking UX ready for tournament use without spreadsheet chaos.'
gallery:
  - src: /projects/bolao-copa.png
    alt: Bolão na Copa screen showing match predictions and the participant ranking
    caption: Prediction flow and pool standings
---
