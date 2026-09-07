// Seebad Caputh - Website JavaScript

// Rezensionen-Daten
const reviews = [
  {
    text: "Die leckere selbstgemachte Pizza war der Hammer!",
    author: "Gast",
    date: "vor 11 Monaten",
    rating: 5
  },
  {
    text: "Super nettes Personal, lecker Bier & Cocktails und lecker Essen.",
    author: "Gast",
    date: "vor 11 Monaten",
    rating: 5
  },
  {
    text: "Jedes Mal ein tolles Erlebnis und immer wieder neue Sachen zu entdecken.",
    author: "Gast",
    date: "vor 11 Monaten",
    rating: 5
  },
  {
    text: "Muscheln suchen und Glasscherben im Sand finden. Super.",
    author: "Gast",
    date: "vor 11 Monaten",
    rating: 5
  },
  {
    text: "Einzigartige Location & perfektes Service-Team!",
    author: "KingKaClubBand",
    date: "vor 2 Monaten",
    rating: 5
  },
  {
    text: "Eigentlich ein richtig schöner Ort tolle Lage am Wasser und gute Atmosphäre. Leider lässt der Service etwas zu wünschen übrig. Mehr Eissorten zur Auswahl und zumindest kaltes Sprudelwasser wären super bei heißem Wetter.",
    author: "Federa",
    date: "vor einem Jahr",
    rating: 4
  },
  {
    text: "Wunderschöner Ort. Kann es nur jedem empfehlen.",
    author: "Gast",
    date: "vor 4 Tagen",
    rating: 5
  },
  {
    text: "Toller Service von dem Team. Man geht am Abend nachhause mit einem unvergesslichen Tag in Ihrer Location.",
    author: "SOKO Schmotte",
    date: "vor 4 Monaten",
    rating: 5
  },
  {
    text: "Meine Rezension bezieht sich ausschließlich auf den Qi Sunset Beach - den Strandabschnitt. Grundsätzlich schöner Strand. Jedoch finde ich die Preise extrem sportlich: Eintritt 8,50 p.P. - nicht günstig, aber ok.",
    author: "NB",
    date: "vor 2 Monaten",
    rating: 4
  },
  {
    text: "Ein traumhafter Ort mit tollem Sonnenuntergang und lecker Cocktails und Snacks. Kommen sicher wieder!",
    author: "Jens",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Wunderbare Gegend. Schön angelegt und sauber. Macht weiter so.",
    author: "Steffen Heinhold",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Großes Kino, Coole Location, spannendes Publikum, super Gastgeber und lekker Speis und Trank",
    author: "Dirk Schulz",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Außergewöhnlich tolle Location in Brandenburg. Karibikfeeling pur, muss man gesehen haben. Angenehmes Publikum jeder Altersklasse.",
    author: "Pretzi 77",
    date: "vor 3 Jahren",
    rating: 5
  },
  {
    text: "Ein sehr netter Ort zum Verweilen. Nicht zu überlaufen. Etwas versteckt aber dennoch für geübte kein Problem. Der Sonnenuntergang am Abend sollte man hier nicht verpassen.",
    author: "Luca C. L.",
    date: "vor 7 Jahren",
    rating: 5
  },
  {
    text: "Sehr exclusive Location. Sicherlich nicht geeignet für alle, die nur mal eben Baden wollen.",
    author: "Diego Grummt",
    date: "vor 2 Jahren",
    rating: 5
  },
  {
    text: "Was für eine Aussicht. Tolle Cocktails, echt lecker und super freundliches Personal. Platz nehmen und entspannen.",
    author: "Heiko Hoffmann",
    date: "vor 5 Jahren",
    rating: 5
  },
  {
    text: "Absolut tolle Event Location. Wir haben hier unsere Hochzeit gefeiert und uns super wohl gefühlt. Das Team war sehr zuvorkommend, die Kommunikation immer schnell, zuverlässig und kooperativ.",
    author: "Jani P",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Die Seebrücke ist atemberaubend! Total entspannte Atmosphäre, mega schöne Einrichtung, freundliches Personal, saubere Anlage, leckere Drinks und der schönste Sonnenuntergang südlich von Berlin.",
    author: "Aline H.",
    date: "vor 2 Jahren",
    rating: 5
  },
  {
    text: "Wunderschöne Location. Besonders für Hochzeit oder ähnliches sehr zu empfehlen. Essen war sehr lecker.",
    author: "Laura Miel",
    date: "vor 2 Jahren",
    rating: 5
  },
  {
    text: "Ein schöner Platz am Wasser mit freundlichem Personal. Alles war sauber und nett. Die Kids können weit ins Wasser gehen bevor es wirklich tief wird.",
    author: "Michael Hovemann",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Wir haben heute eine Hochzeit in der Sommerlounge gefeiert. Sehr freundliches Personal, und sehr gutes Essen. Kann man auf jeden Fall weiter empfehlen.",
    author: "Tom Lindner",
    date: "vor einem Jahr",
    rating: 5
  },
  {
    text: "Wir waren während einer Fahrradtour dort. Sehr schöne Aussicht und sehr bequeme und verschiedene Sitzmöglichkeiten. Man kann dort sehr lange verweilen.",
    author: "Media Penkwitz",
    date: "vor einem Jahr",
    rating: 5
  },
  {
    text: "Schöner Ort zum Baden und entspannen. Wer das erste Mal dort ist wird durch den Automaten am Eingang irritiert.",
    author: "Andrea Busse",
    date: "vor 11 Monaten",
    rating: 5
  },
  {
    text: "Nette Location. Preis-Leistung total akzeptabel. Sehr schönes, entspanntes Ambiente.",
    author: "Viktoria",
    date: "vor 2 Monaten",
    rating: 5
  },
  {
    text: "Einzigartige Lokation mit außergewöhnlichem Charme bei Hochzeiten. Das Essen ist sehr lecker und das Personal freundlich, hilfsbereit und aufmerksam.",
    author: "Carmen Klabisch",
    date: "vor 3 Jahren",
    rating: 5
  },
  {
    text: "Wir haben unsere Traumhochzeit im Seebad Caputh mit 20 Gästen gefeiert. Man kann es nicht anders beschreiben: Es war einfach alles perfekt!",
    author: "Judith Kluge",
    date: "vor 5 Jahren",
    rating: 5
  },
  {
    text: "Wir haben im August 2021 unsere Hochzeit im Seebad Caputh auf der Seebrücke gefeiert. Erst einmal ist es eine wunderschöne Location und der dort mitarbeitende Sohn der Besitzer hat uns einen tollen Überblick bei der Vorbesprechung gegeben.",
    author: "JGS",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Wir haben eine unvergessliche Hochzeit gefeiert. Für uns als Partyband ist im Vorfeld eines Auftritts die Organisation sehr wichtig.",
    author: "KingKaClubBand",
    date: "vor 2 Monaten",
    rating: 5
  },
  {
    text: "Ein schöner Badeplatz nur sehr überteuert. Das gepiepste nervt einfach.",
    author: "Heinz Wagner",
    date: "vor 2 Jahren",
    rating: 4
  },
  {
    text: "Nette Location. Preis sehr hoch, dafür das alles Selbstbedienung ist. Daher kann leider der Service nur 3 Sterne bekommen.",
    author: "Daniela",
    date: "vor einem Jahr",
    rating: 3
  },
  {
    text: "Am Samstag, den 25.04.2026 zu Gast. Toller Service von dem Team. Man geht am Abend nachhause mit einem unvergesslichen Tag in Ihrer Location.",
    author: "SOKO Schmotte",
    date: "vor 4 Monaten",
    rating: 5
  },
  {
    text: "Mega Aussicht, tolle Location....wirklich aller erste Sahne!!!",
    author: "Rick Brackmann",
    date: "vor 3 Monaten",
    rating: 5
  },
  {
    text: "Sehr schönes Seebad, tolle Atmosphäre und wunderbarer Blick, sauberer Strand, leider nur eine sehr begrenzte Auswahl an Essen und Preise sehr hoch.",
    author: "Juliane Henneberg",
    date: "vor 4 Jahren",
    rating: 4
  },
  {
    text: "Schönes Strandbad mit Liegen, Cabanas, Schwimminseln oder einfach nur Sand. Die Infrastruktur ist exzellent.",
    author: "Stefan Tietz",
    date: "vor 5 Jahren",
    rating: 5
  },
  {
    text: "Eine Oase vor der Haustür, um die Seele baumeln zu lassen. Fantastische Location, mit Urlaubsfeeling.",
    author: "Nicole Meissner",
    date: "vor 7 Jahren",
    rating: 5
  },
  {
    text: "Ein wunderschönes idyllisch gelegenes Plätzchen. Jetzt in der Nebensaison perfekt.",
    author: "Selin Asansu",
    date: "vor 6 Jahren",
    rating: 5
  },
  {
    text: "Ein sehr schöner Ort..um zu entspannen..",
    author: "JENNA N.",
    date: "vor 3 Jahren",
    rating: 5
  },
  {
    text: "Leider hatten wir kein Badewetter und trotzdem lag eine tropische Atmosphäre in der Luft!",
    author: "Planet Kate (Katerina)",
    date: "vor 3 Jahren",
    rating: 5
  },
  {
    text: "Absolut empfehlenswert, vorallem für Veranstaltungen, wie Hochzeiten. Wir hatten Anfang Juni dort geheiratet und waren begeistert.",
    author: "Carina Scharnbeck",
    date: "vor 7 Jahren",
    rating: 5
  },
  {
    text: "Wir sind vom Prenzlauer Berg, Berlin, angereist und es hat uns sehr gefallen! Vor allem dass man dort diese Liegebetten dazu buchen kann.",
    author: "Svenja Seidel",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Traumhaftes Ambiente! Urlaubsfeeling vor den Toren Berlins. Die unheimliche Ruhe auf dem Wasser streichelt die Seele.",
    author: "Ralf Brunow",
    date: "vor 8 Jahren",
    rating: 5
  },
  {
    text: "Ein richtig schöner Ort tolle Lage am Wasser und gute Atmosphäre. Leider lässt der Service etwas zu wünschen übrig.",
    author: "Federa",
    date: "vor einem Jahr",
    rating: 4
  },
  {
    text: "Wunderschöne Anlage, die Bar auf der Seebrücke einfach super, top Ambiente, tolle Getränke.",
    author: "Ulf.Thieleke@google.de ulf",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Ein wunderschönes, sehr gemütliches Strandbad direkt am Wasser mit einem ganz besonderen Ambiente.",
    author: "Hochzeitsfotograf Kassel The Heritage Wedding",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Ich war heute mit meiner Familie im Strandbad Caputh. Wir wurden sehr freundlich begrüßt. Auf den Cabanas hat man ein richtiges Urlaubsfeeling.",
    author: "laura katharina",
    date: "vor 5 Jahren",
    rating: 5
  },
  {
    text: "Sehr angenehmer Ort zum verweilen, relaxen und Entspannen. Sicher werde ich dort mal wieder den Sonnenuntergang genießen.",
    author: "Doreen Schurig",
    date: "vor 2 Jahren",
    rating: 5
  },
  {
    text: "Tolles Ambiente mit Blick über den Schwielowsee. Super nette Bedienung. Toller Sonnenuntergang.",
    author: "M D",
    date: "vor einem Jahr",
    rating: 5
  },
  {
    text: "Ich bin ja etwas verwöhnt vom Starnberger See. Aber dieses Strandbad Bar, Restaurant kann problemlos mithalten.",
    author: "Thomas Fuegner",
    date: "vor 5 Jahren",
    rating: 5
  },
  {
    text: "So schön kann ein Sommerabend im Strandbad Caputh sein, so schön wie in der Karibik oder auf Capri, wo die rote Sonne versinkt.",
    author: "Bernd Spohr",
    date: "vor 6 Jahren",
    rating: 5
  },
  {
    text: "Hier kann man entspannen und die Natur an einem vorbeiziehen lassen, in Form von halbstündigen Güterwagen mit Holz, Öl und Kohle beladen.",
    author: "Ramin Baradari",
    date: "vor 6 Jahren",
    rating: 5
  },
  {
    text: "Wir waren zum Abendessen hier und das Ambiente, das Essen und der Sonnenuntergang dazu waren einfach unschlagbar! Wir kommen wieder.",
    author: "Leonie Sonntag",
    date: "vor 11 Monaten",
    rating: 5
  },
  {
    text: "Wir haben zu einer Geburtstagsfeier im Strandbad Caputh. Das Ambiente ist schön und die Mitarbeiter waren sehr freundlich.",
    author: "Benjamin Scholz",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Ein schöner Ort für Familienfeste und Hochzeiten. In kleiner Gesellschaft gibt es einen schönen Wintergarten/Pavillion.",
    author: "Reinhardt & Sommer Fotografen",
    date: "vor 6 Jahren",
    rating: 5
  },
  {
    text: "Großes Kino, Coole Location, spannendes Publikum, super Gastgeber und lekker Speis und Trank",
    author: "Dirk Schulz",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Sehr schöne Seebrücke, wunderschönes Strandbad. Der Eintritt kostet 7,50 Euro. Leider gibt es in der Cocktail Bar auf der Seebrücke keinen Pina Colada.",
    author: "Karin Telljohann",
    date: "vor 5 Jahren",
    rating: 4
  },
  {
    text: "Toller Sonnenuntergang, Cocktails und Entspannung pur...",
    author: "Heike Kratzert",
    date: "vor 5 Jahren",
    rating: 5
  },
  {
    text: "Das Seebad Caputh ist ein echtes Sommerparadies! Die Lage direkt am Templiner See ist traumhaft.",
    author: "LeXY CaSH",
    date: "vor einem Jahr",
    rating: 5
  },
  {
    text: "Einzigartige Location & perfektes Service-Team! Für uns als Partyband ist im Vorfeld eines Auftritts die Organisation sehr wichtig.",
    author: "KingKaClubBand",
    date: "vor 2 Monaten",
    rating: 5
  },
  {
    text: "Am Ende einer tollen Radtour haben wir dort einen Sundowner genommen. Super schöne Location, nette Leute.",
    author: "Claus Vormann",
    date: "vor 2 Jahren",
    rating: 5
  },
  {
    text: "Sehr nettes Personal, gutes Essen, sauberer Sand, und sauberes Wasser. Was will man mehr?",
    author: "Mert Arman",
    date: "vor einem Jahr",
    rating: 5
  },
  {
    text: "Ein wunderschöner Ort zum Entspannen. Freundliches Personal und tolle Atmosphäre.",
    author: "Stefanie Heldt",
    date: "vor 6 Jahren",
    rating: 5
  },
  {
    text: "Komme immer wieder gerne her. Einfach schön zum relaxen.",
    author: "Steffi Wichert",
    date: "vor 8 Jahren",
    rating: 5
  },
  {
    text: "Einfach ein Traum... bin ich noch in Potsdam oder schon in Asien an einem Traumstrand.",
    author: "Stephanie B.",
    date: "vor 6 Jahren",
    rating: 5
  },
  {
    text: "Am Sammlungstag mit einer tollen Radtour dort einen Sundowner genommen. Super schöne Location.",
    author: "Claus Vormann",
    date: "vor 2 Jahren",
    rating: 5
  },
  {
    text: "Ein schöner Strandbad und kostenlose Parkplätze in der Nähe.",
    author: "Josefine Berlin",
    date: "vor einem Jahr",
    rating: 5
  },
  {
    text: "Die Ambiente ist Super, Service und bedienerin waren sehr Sympatisch, gerne wieder.",
    author: "Göksel Tanirgan",
    date: "vor einem Jahr",
    rating: 5
  },
  {
    text: "Schönes Strandbad mit Liegen, Cabanas, Schwimminseln oder einfach nur Sand. Die Infrastruktur ist exzellent.",
    author: "Stefan Tietz",
    date: "vor 5 Jahren",
    rating: 5
  },
  {
    text: "Ein wirklich schöner Ort. Klein und etwas versteckt. Bestlage. Vor kurzem durch Zufall entdeckt.",
    author: "Sebastian Kost",
    date: "vor 6 Jahren",
    rating: 5
  },
  {
    text: "Wir waren mit meiner Familie im Strandbad Caputh und war total begeistert. Wir waren für zwei Stunden auf klein Ibiza.",
    author: "Ninette Wianke",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Einfach ein Ort zum erholen und abschalten. Komme gerne wieder.",
    author: "Bianca Heindl",
    date: "vor 2 Jahren",
    rating: 5
  },
  {
    text: "Bei bester Lage entschleunigen und einen perfekten Kaffee genießen, was wünscht man sich mehr.",
    author: "Jannik",
    date: "vor einem Jahr",
    rating: 5
  },
  {
    text: "Ein sehr schöner Ort zum Entspannen.",
    author: "Alex H.",
    date: "vor 2 Jahren",
    rating: 5
  },
  {
    text: "Sehr schöne Location, tolle Aussicht auf den Sonnenuntergang.",
    author: "Reinhard Kubik",
    date: "vor 3 Jahren",
    rating: 5
  },
  {
    text: "Nettes Plätzchen, um den Sonnenuntergang bei einem Aperol Spritz zu genießen.",
    author: "Ulrich Füßhacke",
    date: "vor 7 Jahren",
    rating: 5
  },
  {
    text: "Ein Ort zum Träumen und Verweilen. So nah bei Berlin und doch so viel Urlaubsstimmung.",
    author: "Caroline R.",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Eine einmalige Location in Brandenburg. Karibikfeeling pur.",
    author: "Falk",
    date: "vor 8 Jahren",
    rating: 5
  },
  {
    text: "Wunderschöne Anlage, nettes Personal. Komme auf jeden Fall wieder!",
    author: "ivonne h",
    date: "vor 5 Jahren",
    rating: 5
  },
  {
    text: "Ein wunderschönes, sehr gemütliches Strandbad direkt am Wasser mit einem ganz besonderen Ambiente.",
    author: "d k Fotografie",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Wunderschöner Ort. Waren fast allein dort. Sehr schön zum Baden, alles sehr gepflegt!",
    author: "Maria Steinhoff",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Strandbad mit idyllischer Atmosphäre, SUP-Verleih, Überdachten Strandliegen Duschen, WCs, Imbiss und einem Restaurant auf einer Seebrücke.",
    author: "Kay Wagner",
    date: "vor 3 Jahren",
    rating: 5
  },
  {
    text: "Wunderschöner Ort zum Verweilen. Nicht zu überlaufen. Etwas versteckt aber dennoch für geübte kein Problem.",
    author: "Luca C. L.",
    date: "vor 7 Jahren",
    rating: 5
  },
  {
    text: "Ein Ort zum Träumen und Verweilen. So nah bei Berlin und doch so viel Urlaubsstimmung.",
    author: "Caroline R.",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Perfekte Location für Hochzeiten und Events. Das Personal war sehr zuvorkommend.",
    author: "Anica Spieler",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Ein wunderschöner Tag im Seebad. Sehr gepflegter Strand, nettes Personal.",
    author: "Lucy Lustig",
    date: "vor 7 Jahren",
    rating: 5
  },
  {
    text: "Ein Ort zum Erholen und Abschalten. Komme gerne wieder.",
    author: "Birgit",
    date: "vor 2 Jahren",
    rating: 5
  },
  {
    text: "Traumhafte Atmosphäre und perfekte Service. Ideal für besondere Anlässe.",
    author: "Anja Beyer",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Wir haben unseren Firmen-Sommerfest im Seebad Caputh mit knapp 60 Personen gefeiert. Von der Planung bis zur Umsetzung, der Betreuung vor Ort.... Alles hat hervorragend geklappt.",
    author: "Ivonne Hofmeister",
    date: "vor 5 Jahren",
    rating: 5
  },
  {
    text: "Wirklich schöne Location, tolle Aussicht auf den Sonnenuntergang.",
    author: "lachsi lachs",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Ein schöner Platz am Wasser mit freundlichem Personal. Alles war sauber und nett.",
    author: "Michael Hovemann",
    date: "vor 4 Jahren",
    rating: 5
  },
  {
    text: "Super Location direkt am Wasser gelegen. Urlaubsflair pur und die Chance auf grandiose Sonnenuntergänge.",
    author: "Harald Rettich",
    date: "vor 6 Jahren",
    rating: 5
  },
  {
    text: "Kuchen und Cafe ist lecker. Aussicht und Personal Top.",
    author: "Matthias Stüwe",
    date: "vor 8 Jahren",
    rating: 5
  },
  {
    text: "Super Location. Einfach schöne zum relaxen und genießen. Alles mit sehr viel Liebe gestaltet.",
    author: "Susan Buchholz",
    date: "vor 8 Jahren",
    rating: 5
  },
  {
    text: "Tolles Ambiente, für jeden was dabei. Teuer aber sein Geld wert.",
    author: "Melanie Zdun",
    date: "vor 3 Jahren",
    rating: 5
  },
  {
    text: "Sehr schönes Seebad, tolle Atmosphäre und wunderbarer Blick, sauberer Strand.",
    author: "Alexander Golder",
    date: "vor 6 Jahren",
    rating: 5
  },
  {
    text: "Ein Ort zum Verweilen und Abschalten. Sehr zu empfehlen.",
    author: "Bettina Ewald",
    date: "vor 5 Jahren",
    rating: 5
  },
  {
    text: "Tolles Strandbad mit idyllischer Atmosphäre, SUP-Verleih, Überdachten Strandliegen.",
    author: "Kay Wagner",
    date: "vor 3 Jahren",
    rating: 5
  },
  {
    text: "Ein wunderschöner Ort zum Entspannen. Toller Sonnenuntergang.",
    author: "Jens Neder",
    date: "vor 4 Jahren",
    rating: 5
  }
];

// Variablen
let shownReviews = 8;
const reviewsPerLoad = 12;
const totalReviews = reviews.length;

// Funktion zum Erstellen eines Review-Cards
function createReviewCard(review) {
  const card = document.createElement('div');
  card.className = 'review-card';
  
  const stars = '⭐'.repeat(review.rating);
  
  card.innerHTML = `
    <div class="review-stars">${stars}</div>
    <p>${review.text}</p>
    <div class="review-meta">
      <span class="review-author">${review.author}</span>
      <span class="review-date">${review.date}</span>
    </div>
  `;
  
  return card;
}

// Funktion zum Laden der Rezensionen
function loadReviews() {
  const container = document.getElementById('reviews-container');
  container.innerHTML = '';
  
  for (let i = 0; i < Math.min(shownReviews, totalReviews); i++) {
    container.appendChild(createReviewCard(reviews[i]));
  }
  
  // Update Counter
  document.getElementById('shown-count').textContent = Math.min(shownReviews, totalReviews);
  document.getElementById('total-count').textContent = totalReviews + '+';
  
  // Button verstecken, wenn alle geladen sind
  const loadMoreBtn = document.getElementById('load-more');
  if (shownReviews >= totalReviews) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-flex';
  }
}

// Event Listener für "Mehr Bewertungen" Button
document.getElementById('load-more').addEventListener('click', () => {
  shownReviews += reviewsPerLoad;
  loadReviews();
  
  // Scroll zu den neuen Rezensionen
  document.getElementById('reviews-container').lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-header nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Smooth Scroll für Ankerlinks
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Reservierungsformular-Handling
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(reservationForm);
    const data = Object.fromEntries(formData);
    
    if (!data.name || !data.guests || !data.date || !data.time) {
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    
    alert(`Vielen Dank für Ihre Reservierungsanfrage, ${data.name}!\n\n` +
          `Wir haben Ihre Anfrage für ${data.guests} Personen am ${data.date} um ${data.time} Uhr erhalten.\n` +
          `Sie erhalten in Kürze eine Bestätigung per E-Mail oder Telefon.`);
    
    reservationForm.reset();
  });
}

// Galerie - Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
`;

const lightboxImg = document.createElement('img');
lightboxImg.style.cssText = `max-width: 90%; max-height: 90%; border-radius: 8px;`;
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.style.opacity = '1';
    lightbox.style.pointerEvents = 'auto';
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.opacity = '0';
    lightbox.style.pointerEvents = 'none';
  }
});

// Intersection Observer für Animationen
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Beobachte alle Sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s, transform 0.6s';
  observer.observe(section);
});

// CSS für sichtbare Sections
const style = document.createElement('style');
style.textContent = `
  section.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Aktuelles Jahr im Footer
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
  const currentYear = new Date().getFullYear();
  footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
}

// Rezensionen initial laden
loadReviews();

console.log('Seebad Caputh Website - JavaScript geladen');
