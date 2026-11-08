// Toimintalogiikka. Sisältöä ja ulkoasua muokataan index.html- ja styles.css-tiedostoissa.
const main = document.querySelector('main');
const questionTemplates = [...document.querySelectorAll('template[data-question]')];
const personTemplates = [...document.querySelectorAll('template[data-person]')];
const weights = questionTemplates.map(template =>
  [...template.content.querySelectorAll('[data-answer]')].map(button =>
    button.dataset.scores.split(',').map(Number)
  )
);
const storageKey = 'tommi-answers-v1';

// Vastausten tarkistus ja tuloksen laskenta.
function validAnswers(value) {
  return Array.isArray(value) && value.length <= weights.length &&
    value.every((answer, q) =>
      Number.isInteger(answer) && answer >= 0 && answer < weights[q].length
    );
}

function getResult(answers) {
  if (!validAnswers(answers) || answers.length !== weights.length) {
    throw new Error('Vastaa ensin kaikkiin kysymyksiin.');
  }
  const scores = personTemplates.map(() => 0);
  answers.forEach((answer, q) => {
    weights[q][answer].forEach((points, person) => scores[person] += points);
  });
  let candidates = scores.map((_, i) => i).filter(i => scores[i] === Math.max(...scores));
  // Tasapisteissä viimeisin ehdokkaat erottava vastaus ratkaisee.
  for (let q = answers.length - 1; q >= 0 && candidates.length > 1; q--) {
    const best = Math.max(...candidates.map(i => weights[q][answers[q]][i]));
    candidates = candidates.filter(i => weights[q][answers[q]][i] === best);
  }
  return { person: candidates[0], scores };
}

// Vastaukset säilyvät saman välilehden istunnossa.
let answers = [];
try {
  const stored = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
  if (validAnswers(stored)) answers = stored;
} catch {}

function save() {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(answers));
  } catch {}
}

function go(route) {
  location.hash = route;
}

// data-fit on valinnainen: poista se HTML:stä, jos haluat määrätä koon vain CSS:llä.
function fit() {
  main.querySelectorAll('[data-fit]').forEach(element => {
    element.style.removeProperty('font-size');
    if (innerWidth <= 600) return;
    const range = document.createRange();
    range.selectNodeContents(element);
    const width = range.getBoundingClientRect().width;
    if (width > element.clientWidth) {
      element.style.fontSize =
        parseFloat(getComputedStyle(element).fontSize) * element.clientWidth / width + 'px';
    }
  });
}

function renderPage() {
  const route = location.hash.slice(1) || 'home';
  const questionMatch = /^question-(\d+)$/.exec(route);
  const personMatch = /^(tommi|result)-(\d+)$/.exec(route);
  const questionIndex = questionMatch ? Number(questionMatch[1]) : -1;
  const personIndex = personMatch ? Number(personMatch[2]) : -1;
  const question = questionTemplates[questionIndex];
  const person = personTemplates[personIndex];

  if (question && questionIndex > answers.length) {
    go('question-' + answers.length);
    return;
  }

  const template = question || person || document.getElementById(
    route === 'menu' ? 'menu-template' : 'home-template'
  );
  const view = template.content.cloneNode(true);

  if (question) {
    view.querySelectorAll('[data-answer]').forEach(button => {
      button.classList.toggle('selected', answers[questionIndex] === Number(button.dataset.answer));
    });
  }

  main.className = 'page ' + (template.dataset.pageClass || '');
  main.replaceChildren(view);

  main.querySelectorAll('[data-start]').forEach(button => {
    button.addEventListener('click', () => {
      answers = [];
      save();
      go('question-0');
    });
  });
  main.querySelectorAll('[data-answer]').forEach(button => {
    button.addEventListener('click', () => {
      main.querySelectorAll('[data-answer]').forEach(answer => answer.disabled = true);
      answers = [...answers.slice(0, questionIndex), Number(button.dataset.answer)];
      save();
      go(questionIndex < questionTemplates.length - 1
        ? 'question-' + (questionIndex + 1)
        : 'result-' + getResult(answers).person);
    });
  });

  window.scrollTo(0, 0);
  main.querySelector('h1')?.focus({ preventScroll: true });
  fit();
}

// Valinnainen kokeilu. Ilman motion.js:ää säilyy alkuperäinen suora päivitys.
function render() {
  if (window.tommiMotion) window.tommiMotion.render(renderPage);
  else renderPage();
}

window.addEventListener('hashchange', render);
window.addEventListener('resize', fit);
document.fonts.ready.then(fit);
render();
