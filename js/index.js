import {
  formComponent,
  actionsComponent,
  startBtnComponent,
  gameComponent,
} from "./components/index.js";
import {
  emailDefault,
  emailRegex,
  passwordDefault,
  winScore,
  loseScore,
  gameOptions,
} from "./config.js";

const app = document.querySelector("#app");
let score = 0;
let game = 0;

const computerSelection = () => {
  const cpSelection = document.querySelector("#computer-selection");
  const options = [0, 1, 2];
  const randomOption = Math.floor(Math.random() * options.length);

  cpSelection.innerHTML = `<img class="image" src="./assets/${gameOptions[randomOption]}"/>`;

  return randomOption;
};

const initializeActions = () => {
  const result = document.querySelector("#result");

  result.insertAdjacentHTML("beforeend", actionsComponent);

  const btnSelection = document.querySelectorAll(".btn");

  btnSelection.forEach((btn) => {
    btn.addEventListener("click", playerSelection.bind(null, btn));
  });
};

const startGame = () => {
  const scoreList = document.querySelector("#score-item");
  const btnStart = document.querySelector("#btn-start");
  const initialScore = document.querySelector("#initial-score");
  const prSelection = document.querySelector("#player-selection");
  const cpSelection = document.querySelector("#computer-selection");
  const startContent = document.querySelector("#start");
  const textResult = document.querySelector("#result-title");


  score = 0;
  game = 0;
  scoreList.innerHTML = "";
  initialScore.innerText = "";
  prSelection.innerHTML = "";
  cpSelection.innerHTML = "";
  textResult.innerText= "";

  btnStart.remove();
  startContent.remove();

  initializeActions();
};

const historyData = (data = null) => {
  const historyDataBase = document.querySelector("#history-data");
  let history = [];
  let historyElements = [];

  history = localStorage.getItem("history");

  if (history) {
    historyElements = JSON.parse(history);
    if (data) historyElements.push(data);
  } else {
    if (data) historyElements = [data];
  }

  localStorage.setItem("history", JSON.stringify(historyElements));

  let historyList = "";

  for (
    let i = historyElements.length - 1;
    i >= historyElements.length - 5;
    i--
  ) {
    const element = historyElements[i] ? historyElements[i] : 0;

    historyList += ` <li class="history__list" >${element}</li>`;
  }

  historyDataBase.insertAdjacentHTML(
    "beforeend",
    `<ul id="data-item">${historyList}</ul>`
  );
};

const playerSelection = (btn) => {
  const prSelection = document.querySelector("#player-selection");
  const scoreList = document.querySelector("#score-item");
  const initialScore = document.querySelector("#initial-score");
  const textResult = document.querySelector("#result-title");
  const prSelectionValue = +btn.dataset.selection;
  const cpSelection = computerSelection();

  prSelection.innerHTML = `<img class="image" src="./assets/${gameOptions[prSelectionValue]}"/>`;

  if (prSelectionValue === cpSelection) {
    textResult.innerText = "Draw";
  } else if (prSelectionValue === 0 && cpSelection === 1) {
    score += loseScore;
    textResult.innerText = "Computer Wins";
  } else if (prSelectionValue === 0 && cpSelection === 2) {
    score += winScore;
    textResult.innerText = "Player Wins";
  } else if (prSelectionValue === 1 && cpSelection === 0) {
    score += winScore;
    textResult.innerText = "Player Wins";
  } else if (prSelectionValue === 1 && cpSelection === 2) {
    score += loseScore;
    textResult.innerText = "Computer Wins";
  } else if (prSelectionValue === 2 && cpSelection === 0) {
    score += loseScore;
    textResult.innerText = "Computer Wins";
  } else if (prSelectionValue === 2 && cpSelection === 1) {
    score += winScore;
    textResult.innerText = "Player Wins";
  }

  initialScore.innerText = `Total Score: ${score}`;

  game++;

  scoreList.innerHTML += `<li class="score__item">Round ${game} - Score: ${score}</li>`;

  if (game === 10) {
    const btnOptions = document.querySelector("#btn-options");

    btnOptions.remove();

    const result = document.querySelector("#result");

    result.insertAdjacentHTML("beforeend", startBtnComponent);

    const btnStart = document.querySelector("#btn-start");

    btnStart.addEventListener("click", startGame);

    const dataItems = document.querySelector("#data-item");
    dataItems.remove();

    historyData(score);
  }
};

const logout = () => {
  app.innerHTML = formComponent;
  const formLogin = document.querySelector("#form");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  formLogin.addEventListener("submit", login);
  email.addEventListener("blur", validateEmail);
  password.addEventListener("blur", validatePassword);
};

const isValidEmail = (emailValue) => {
  const email = document.querySelector("#email");
  const hindText = document.querySelector("#hind-email");

  if (!emailValue || (!emailRegex.test(email.value))) {
    const message = !emailValue ? "Email is empty" : "Email is invalid"
    email.classList.add("form__error");
    email.insertAdjacentHTML(
      "afterend",
      `<div id="hind-email" class="form__hint">${message}</div>`
    );
  } else {
    email.classList.remove("form__error");
  }

  if (hindText) {
    hindText.remove();
  }
};

const isValidPassword = (passwordValue) => {
  const password = document.querySelector("#password");
  const hindText = document.querySelector("#hind-text");

  if (!password.value) {
    password.classList.add("form__error");
    password.insertAdjacentHTML(
      "afterend",
      '<div id="hind-text" class="form__hint">Password is empty</div>'
    );
  } else {
    password.classList.remove("form__error");
  }

  if (hindText) {
    hindText.remove();
  }
};

const validateEmail = (e) => {
  isValidEmail(e.target.value);
};

const validatePassword = (e) => {
  isValidPassword(e.target.value);
};

const login = (e) => {
  e.preventDefault();

  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  isValidEmail(email.value);
  isValidPassword(password.value);

  if (email.value === emailDefault && password.value === passwordDefault) {
    app.innerHTML = gameComponent;

    const btnLogout = document.querySelector("#btn-logout");

    initializeActions();
    historyData();

    btnLogout.addEventListener("click", logout);
  } else {
    console.log("login bad");
  }
};

app.innerHTML = formComponent;

const formLogin = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

formLogin.addEventListener("submit", login);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
