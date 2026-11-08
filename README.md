# Tommi-testi

Avaa `index.html` selaimessa. Asennusta tai käännösvaihetta ei tarvita.

## Muokkaa näitä kahta tiedostoa

- **index.html**: kaikki näkyvät tekstit, kysymykset, vastaukset, hahmot, linkit, kuvat ja sivujen rakenne.
- **styles.css**: värit, fontit, koot, välit ja asettelu eri näyttökoossa. Yhteiset väri- ja fonttiasetukset ovat tiedoston alussa.

`app.js` hoitaa navigoinnin, vastausten tallennuksen ja tuloksen laskennan. Sitä ei tarvitse muokata sisältöä tai ulkoasua vaihtaessa.

## HTML:n muokkaaminen

### Valinnainen animaatiokokeilu

Valitse animaatiot `index.html`-tiedoston alussa:

- `data-motion="bold"`: näyttävä versio (nyt käytössä).
- `data-motion="on"`: aiempi hillitty versio.
- `data-motion="off"`: kaikki kokeilun animaatiot pois.

Pois kytkettäessä alkuperäinen ulkoasu ja välitön navigointi palautuvat. Animaatiot ohitetaan myös automaattisesti, jos käyttöjärjestelmässä on vähennetty liike käytössä.

Kokeilun tyylit ovat erillisessä `motion.css`-tiedostossa. Sen alusta voi säätää kestoja. `motion.js` lisää valitun tilan sivusiirtymän sitä tukevissa selaimissa; muissa selaimissa käytetään kevyttä sisääntuloanimaatiota. Painalluksiin ei lisätä keinotekoista viivettä.

Kokeilun voi poistaa kokonaan poistamalla HTML:stä `motion.css`- ja `motion.js`-latausrivit. `styles.css` sisältää edelleen alkuperäiset perustyylit.

### Näkymien rakenne

Jokainen kommentoitu `<template>` on kokonainen näkymä alatunnisteineen. Etsi etusivu, hahmovalikko, haluamasi kysymys tai hahmosivu ja muokkaa sen tavallista HTML:ää. Voit lisätä esimerkiksi kuvan, uuden kappaleen tai oman CSS-luokan. Hahmosivu toimii sekä esittelynä että testituloksena.

Alatunnisteet ovat kunkin näkymän sisällä, joten niiden sisältöä ja rakennetta voi muokata sivukohtaisesti. Yhteinen ulkoasu määritellään CSS:n `footer`-säännöissä. Hahmovalikon linkkitekstit ovat erikseen muokattavissa HTML:ssä.

Säilytä template-elementtien `id`-tunnisteet ja toiminnan tarvitsemat `data-*`-attribuutit. `data-page-class` määrittää pääelementin CSS-luokat. Voit lisätä siihen omia luokkia. `data-fit` sovittaa otsikon leveyteen: poista se, jos haluat hallita fonttikokoa kokonaan CSS:llä.

JavaScript päivittää valitun vastauksen ja vastauspainikkeiden tilan. Kirjoittamiasi sisältötekstejä ei korvata. Kyselyssä ei ole erillistä etenemisriviä, eikä tulossivulla ole uudelleenaloituspainiketta. Uuden testin voi aloittaa etusivun ympyräpainikkeesta.

## Kuvapainikkeet, paluulinkit ja sivunumerot

Kuvat ovat `assets/images`-kansiossa. Aloituspainikkeen `start-arrow.png` sisältää sekä ympyrän että nuolen. `page-01.png`–`page-05.png` ja `page-09.png` ovat alatunnisteen sivunumeroita. Paluulinkkien kuvista on omat värit valikolle, kyselylle ja hahmosivuille.

Vaihda kuva HTML:n `img`-elementin `src`-attribuutista. Päivitä tarvittaessa myös `alt`-teksti sekä `width` ja `height` kuvatiedoston mittojen mukaisiksi. Säilytä ympäröivän linkin `href` tai painikkeen `data-start` ja `aria-label`, jotta toiminta ja saavutettava nimi säilyvät.

Näyttökokoa säädetään CSS:ssä: aloituspainike `.start`, paluulinkit `--footer-link-image-height` ja sivunumerot `--page-number-image-height`. Kuvat säilyttävät mittasuhteensa. PNG-kuvien värit tulevat itse kuvatiedostoista, joten CSS:n tekstiväri ei muuta niitä.

## Kysymysten asettelu

Työpöydällä `.question-label` sijoittaa alaotsikon vastauskorttien yläreunaan oikealle. `--question-label-height` ja `--answer-radius` säätävät loven korkeutta ja kulmien pyöristystä. Tabletilla ja puhelimella alaotsikko on omalla rivillään ennen kortteja.

## Kysymysten ja pisteytyksen muuttaminen

Vastauspainikkeen `data-scores="3,0,0,1"` antaa tässä esimerkissä ensimmäiselle hahmolle kolme pistettä ja neljännelle yhden. Pisteiden järjestys vastaa hahmosivujen järjestystä HTML:ssä. Tasapisteissä viimeisin ehdokkaat erottava vastaus ratkaisee.

Voit lisätä kysymyksen kopioimalla kysymys-template-osan. Pidä kysymykset järjestyksessä ja tunnisteet peräkkäisinä (`question-0-template`, `question-1-template`, …). Vastausten `data-answer`-arvot alkavat nollasta ja seuraavat painikkeiden järjestystä. Vastausten käsittely ja tulokseen siirtyminen mukautuvat kysymysten määrään automaattisesti.

Jos lisäät hahmon, käytä seuraavaa `tommi-N-template`-tunnistetta, säilytä `data-person`, lisää valikkoon linkki ja lisää jokaisen vastauksen pisteisiin uusi luku. Uuden vastauskortin asettelu ja alatunnisteiden sivunumerot muokataan HTML:ssä ja CSS:ssä.

## Tarkistus selaimessa

Kokeile etusivu, hahmovalikko, koko testi, selaimen takaisin-painike sekä uuden testin aloittaminen etusivulta. Tarkista ulkoasu myös kapealla selainikkunalla. Vastaukset säilyvät saman välilehden istunnossa; uudelleenaloitus tyhjentää ne.
