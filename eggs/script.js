// Quiz Logic
const startQuizButton = document.getElementById('start-quiz');
const quizQuestions = document.getElementById('quiz-questions');
const submitQuizButton = document.getElementById('submit-quiz');
const quizResults = document.getElementById('quiz-results');

startQuizButton.addEventListener('click', () => {
  quizQuestions.classList.remove('hidden');
  startQuizButton.classList.add('hidden');
});

submitQuizButton.addEventListener('click', () => {
  const answer1 = document.getElementById('answer1').value.toLowerCase();
  const answer2 = document.getElementById('answer2').value;

  let score = 0;
  if (answer1 === 'albumin') {
    score++;
  }
  if (answer2 === '70') {
    score++;
  }

  quizResults.innerHTML = `<p>You scored ${score} out of 2!</p>`;
  quizResults.classList.remove('hidden');
});

// Egg Animation Enhancement
const animatedEgg = document.getElementById('animated-egg');

animatedEgg.addEventListener('mouseover', () => {
  animatedEgg.style.animation = 'bounce 0.5s infinite';
});

animatedEgg.addEventListener('mouseout', () => {
  animatedEgg.style.animation = 'bounce 2s infinite';
});

// Additional Fun Facts
const factContainer = document.querySelector('.fact-container');
const facts = [
  "Eggs contain all 9 essential amino acids.",
  "The average hen lays 250-300 eggs per year.",
  "Eggshells are made mostly of calcium carbonate.",
  "Egg yolks are one of the few foods that naturally contain Vitamin D.",
  "The world's largest egg weighed 2.589 kg and was laid by an ostrich."
];

let factIndex = 0;
setInterval(() => {
  factContainer.innerHTML = `<p>${facts[factIndex]}</p>`;
  factIndex = (factIndex + 1) % facts.length;
}, 5000);