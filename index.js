const topicForm = document.querySelector(".topic-form");
const topicFormBtn = topicForm.querySelector("button");
const elemForm = document.querySelector(".elem-form");
const elemFormBtn = elemForm.querySelector("button");
const elemsContainer = document.querySelector(".elems-container");
const decisionContainer = document.querySelector(".decision-btn-container");
const decisionBtn = decisionContainer.querySelector("button");

const elements = [];
let decisionMode = false;

const selectTopic = () => {
  const input = topicForm.querySelector("input");

  if (!input.value) return;

  const h2 = document.querySelector("h2");
  topicForm.classList.toggle("hidden");
  topicForm.classList.toggle("visible");
  h2.innerText = input.value;
  input.value = "";
  elemForm.classList.toggle("visible");
  elemForm.classList.toggle("hidden");

  // const elemFormInput = elemForm.querySelector("input");
  // elemFormInput.focus();
};

const addElem = () => {
  const input = elemForm.querySelector("input");
  if (!input.value) return;

  elements.push(input.value);

  input.value = "";
  renderElem();
  switchToDecisionMode();
};

const renderElem = () => {
  let html = "";

  elements.forEach((elem, idx) => {
    html += `<div class="elem valid-elem selected" id="elem${idx}">
<p>${elem}</p>
<button onclick="deleteElem(${idx})">X</button>
</div>`;
  });
  elemsContainer.innerHTML = html;
};

const deleteElem = (idx) => {
  elements.splice(idx, 1);
  const elem = document.querySelector(`#elem${idx}`);
  elem.classList.add("discarded");
  elem.classList.remove("valid-elem");
};

const switchToDecisionMode = () => {
  if (elements.length === 0 && decisionMode) {
    decisionContainer.style.display = "none";
    decisionMode = false;
    return;
  }

  if (elements.length === 0) return;

  decisionContainer.style.display = "flex";
  decisionMode = true;
};

const decide = () => {
  renderElem();
  const length = elements.length;
  const randIdx = Math.floor(Math.random() * length);
  const chosen = elements[randIdx];

  const resultContainerP = document.querySelector(".result-container p");
  resultContainerP.innerText = `${chosen} is selected!`;

  const allElem = document.querySelectorAll(".valid-elem");
  allElem.forEach((elem) => {
    elem.style.background = "none";
    elem.classList.remove("selected");
  });
  const chosenElem = document.querySelector(`#elem${randIdx}`);
  chosenElem.style.background = "#81f4a4";
  chosenElem.classList.add("selected");
};

topicFormBtn.addEventListener("click", selectTopic);
topicForm.addEventListener("keyup", (e) => {
  if (e.key === "Enter") selectTopic();
});
elemFormBtn.addEventListener("click", addElem);
elemForm.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addElem();
});
decisionBtn.addEventListener("click", decide);
