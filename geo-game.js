/**
 * Geo-Guesser Mini-Spiel
 * Ein echtes 360°-Panoramafoto (Pannellum) wird gezeigt, per Multiple-Choice
 * wird das Land geraten. Alle Panoramen stammen von Wikimedia Commons
 * (CC BY-SA / CC0, Fotografen siehe "credit").
 */

// ============================================
// PANORAMEN-POOL
// ============================================
const geoQuestions = [
  {
    country: 'Frankreich',
    panorama: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tour%20Eiffel%20360%20Panorama.jpg?width=1600',
    haov: 360,
    vaov: 48,
    credit: 'Armin Hornung',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Tour_Eiffel_360_Panorama.jpg'
  },
  {
    country: 'Indien',
    panorama: 'https://commons.wikimedia.org/wiki/Special:FilePath/Taj%20Mahal%20360%C2%B0%20View.jpg?width=1600',
    haov: 360,
    vaov: 180,
    credit: 'Arul Prakasam T',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Taj_Mahal_360%C2%B0_View.jpg'
  },
  {
    country: 'Deutschland',
    panorama: 'https://commons.wikimedia.org/wiki/Special:FilePath/2024-03-19%20192645%20Berlin%20Brandenburger%20Tor.jpg?width=1600',
    haov: 360,
    vaov: 180,
    credit: 'Tim Rademacher',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:2024-03-19_192645_Berlin_Brandenburger_Tor.jpg'
  },
  {
    country: 'Vereinigtes Königreich',
    panorama: 'https://commons.wikimedia.org/wiki/Special:FilePath/Trafalgar%20Square%20360%20Panorama%20Cropped%20Sky%2C%20London%20-%20Jun%202009.jpg?width=1600',
    haov: 360,
    vaov: 75,
    credit: 'Diliff',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Trafalgar_Square_360_Panorama_Cropped_Sky,_London_-_Jun_2009.jpg'
  },
  {
    country: 'USA',
    panorama: 'https://commons.wikimedia.org/wiki/Special:FilePath/360-degree%20Panorama%20from%20the%20roof%20of%20the%20New%20York%20World%20Trade%20Center.jpg?width=1600',
    haov: 360,
    vaov: 30,
    credit: 'Dheera Venkatraman',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:360-degree_Panorama_from_the_roof_of_the_New_York_World_Trade_Center.jpg'
  },
  {
    country: 'Russland',
    panorama: 'https://commons.wikimedia.org/wiki/Special:FilePath/Panorama%20360%20Red%20Square.jpg?width=1600',
    haov: 360,
    vaov: 62,
    credit: 'A.Savin',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_360_Red_Square.jpg'
  },
  {
    country: 'Australien',
    panorama: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sydney%20Tower%20Panorama.jpg?width=1600',
    haov: 360,
    vaov: 61,
    credit: 'Gauthier Pelloquin',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Sydney_Tower_Panorama.jpg'
  }
];

const ROUNDS_PER_GAME = 5;

// ============================================
// SPIEL-STATUS
// ============================================
let geoRoundQuestions = [];
let geoCurrentIndex = 0;
let geoScore = 0;
let geoAnswered = false;
let geoViewer = null;

// ============================================
// DOM ELEMENTE
// ============================================
let geoImageWrap, geoProgress, geoOptions, geoFeedback, geoScoreEl, geoNextBtn, geoCredit;

// ============================================
// HILFSFUNKTIONEN
// ============================================
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildOptions(correctCountry) {
  const distractors = shuffleArray(
    geoQuestions
      .map(q => q.country)
      .filter(country => country !== correctCountry)
  ).slice(0, 3);

  return shuffleArray([correctCountry, ...distractors]);
}

function loadPanorama(question) {
  if (geoViewer) {
    geoViewer.destroy();
    geoViewer = null;
  }

  geoViewer = pannellum.viewer('geo-pano', {
    type: 'equirectangular',
    panorama: question.panorama,
    haov: question.haov,
    vaov: question.vaov,
    vOffset: 0,
    autoLoad: true,
    showControls: false,
    compass: false,
    draggable: true,
    mouseZoom: true,
    hfov: 100
  });

  geoCredit.innerHTML = `Foto: <a href="${question.creditUrl}" target="_blank" rel="noopener">${question.credit}</a> (Wikimedia Commons)`;
}

// ============================================
// SPIEL-ABLAUF
// ============================================
function startGeoGame() {
  geoRoundQuestions = shuffleArray(geoQuestions).slice(0, ROUNDS_PER_GAME);
  geoCurrentIndex = 0;
  geoScore = 0;
  geoScoreEl.textContent = '0';
  geoImageWrap.hidden = false;
  geoOptions.hidden = false;
  geoNextBtn.hidden = true;
  renderGeoQuestion();
}

function renderGeoQuestion() {
  geoAnswered = false;
  geoFeedback.textContent = '';
  geoFeedback.className = 'geo-feedback';
  geoNextBtn.hidden = true;

  const question = geoRoundQuestions[geoCurrentIndex];
  loadPanorama(question);
  geoProgress.textContent = `Frage ${geoCurrentIndex + 1} von ${geoRoundQuestions.length}`;

  const options = buildOptions(question.country);
  geoOptions.innerHTML = '';

  options.forEach(country => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'geo-option';
    button.textContent = country;
    button.addEventListener('click', () => handleGeoAnswer(button, country, question.country));
    geoOptions.appendChild(button);
  });
}

function handleGeoAnswer(button, selectedCountry, correctCountry) {
  if (geoAnswered) return;
  geoAnswered = true;

  const allButtons = geoOptions.querySelectorAll('.geo-option');
  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctCountry) {
      btn.classList.add('correct');
    }
  });

  if (selectedCountry === correctCountry) {
    geoScore += 1;
    geoScoreEl.textContent = String(geoScore);
    geoFeedback.textContent = 'Richtig! 🎉';
    geoFeedback.className = 'geo-feedback correct';
  } else {
    button.classList.add('wrong');
    geoFeedback.textContent = `Leider falsch. Richtig wäre: ${correctCountry}`;
    geoFeedback.className = 'geo-feedback wrong';
  }

  const isLastQuestion = geoCurrentIndex === geoRoundQuestions.length - 1;
  geoNextBtn.textContent = isLastQuestion ? 'Ergebnis anzeigen' : 'Weiter →';
  geoNextBtn.hidden = false;
}

function handleGeoNext() {
  const isLastQuestion = geoCurrentIndex === geoRoundQuestions.length - 1;

  if (!isLastQuestion) {
    geoCurrentIndex += 1;
    renderGeoQuestion();
    return;
  }

  if (geoNextBtn.textContent === 'Nochmal spielen') {
    startGeoGame();
    return;
  }

  showGeoResults();
}

function showGeoResults() {
  if (geoViewer) {
    geoViewer.destroy();
    geoViewer = null;
  }

  geoImageWrap.hidden = true;
  geoOptions.hidden = true;
  geoCredit.textContent = '';
  geoProgress.textContent = 'Fertig!';

  const total = geoRoundQuestions.length;
  let message = `Du hast ${geoScore} von ${total} Ländern richtig erraten.`;
  if (geoScore === total) {
    message += ' Perfekt! 🌍✨';
  } else if (geoScore >= total / 2) {
    message += ' Gut gemacht! 👍';
  } else {
    message += ' Nächstes Mal klappt es besser!';
  }

  geoFeedback.textContent = message;
  geoFeedback.className = 'geo-feedback';
  geoNextBtn.textContent = 'Nochmal spielen';
  geoNextBtn.hidden = false;
}

// ============================================
// INITIALISIERUNG
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  geoImageWrap = document.getElementById('geo-image-wrap');
  geoProgress = document.getElementById('geo-progress');
  geoOptions = document.getElementById('geo-options');
  geoFeedback = document.getElementById('geo-feedback');
  geoScoreEl = document.getElementById('geo-score');
  geoNextBtn = document.getElementById('geo-next');
  geoCredit = document.getElementById('geo-credit');

  if (!geoImageWrap || !geoOptions || !geoNextBtn || typeof pannellum === 'undefined') return;

  geoNextBtn.addEventListener('click', handleGeoNext);
  startGeoGame();
});
