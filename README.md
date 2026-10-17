# Washington Capitals – kouluprojekti

Kolme osiota: kokoonpanot, tietoa joukkueesta ja NHL:n API:sta haettavat tilastot.

## API:n valinta
NHL:n julkinen tilastorajapinta: `https://api-web.nhle.com/v1/club-stats/WSH/20252026/2`.
`WSH` = Washington Capitals, `20252026` = kausi ja `2` = runkosarja.
JavaScriptin `fetch()` hakee JSON-muotoisen vastauksen. Tiedot näytetään HTML-taulukoissa.

## GitHub Pages -julkaisu
1. Luo GitHubissa uusi julkinen repository, esim. `washington-capitals`.
2. Lisää tämän kansion kolme tiedostoa (`index.html`, `style.css`, `script.js`) repositoryn juureen.
3. Valitse Settings → Pages → Build and deployment → Deploy from a branch.
4. Valitse `main` ja `/(root)` ja tallenna.
5. Sivun osoite on yleensä `https://KÄYTTÄJÄNIMI.github.io/washington-capitals/`.

## Validointi
- HTML: https://validator.w3.org/ → Validate by File Upload → `index.html`.
- CSS: https://jigsaw.w3.org/css-validator/ → By file upload → `style.css`.
- Julkaisun jälkeen voit tarkistaa myös sivun julkisella URL-osoitteella.
- Korjaa mahdolliset virheet ja ota kuvakaappaukset validointituloksista koulutehtävään.

## Huomioitavaa
Kentälliset ovat esimerkkikokoonpano, eivät ajantasaiset ottelukentälliset. Pelaajakuvat latautuvat NHL:n palvelimelta. Tilastot latautuvat internetin kautta, jos NHL:n API sallii selaimen pyynnön. API ei vaadi tässä toteutuksessa API-avainta.
