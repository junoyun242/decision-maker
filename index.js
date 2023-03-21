const topicForm = document.querySelector(".topic-form");
const topicFormBtn = topicForm.querySelector("button");
const elemForm = document.querySelector(".elem-form");
const elemFormBtn = elemForm.querySelector("button");
const elemsContainer = document.querySelector(".elems-container");

const elements = [];

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
};

const addElem = () => {
  const input = elemForm.querySelector("input");
  if (!input.value) return;

  elements.push(input.value);

  input.value = "";
  renderElem();
};

const renderElem = () => {
  let html = "";

  elements.forEach((elem, idx) => {
    html += `<div class="elem" id="elem${idx}" onclick="deleteElem(${idx})">
<p>${elem}</p>
<button>X</button>
</div>`;
  });
  elemsContainer.innerHTML = html;
};

const deleteElem = (idx) => {
  elements.splice(idx, 1);
  renderElem();
};

topicFormBtn.addEventListener("click", selectTopic);
elemFormBtn.addEventListener("click", addElem);
