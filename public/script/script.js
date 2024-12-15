const taskTitle = document.getElementById("title_task");
const taskPlaceholders = [
  "Faire la vaiselle",
  "Faire son lit",
  "Appeler mon banquier",
  "Rapeller grand-mère",
];

taskTitle.placeholder =
  taskPlaceholders[Math.floor(Math.random() * taskPlaceholders.length)];

function resetErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((e) => {
    e.classList.add("invisible");
  });
}

function taskSubmit() {
  resetErrors();

  const title = document.getElementById("title_task").value;

  // No verification (HTML doing it all)
  const time = document.getElementById("time").value;

  let errorMessage = "";
  let canSubmit = true;

  if (title.trim() == "") {
    errorMessage = "Veuillez donner un titre non vide";
    canSubmit = false;
  }

  if (sessionStorage.getItem(title.trim()) != null) {
    errorMessage = "Tâche déjà existante";
    canSubmit = false;
  }

  if (!canSubmit) {
    event.preventDefault();
    const error = document.querySelector("#title_task ~ p");
    error.classList.remove("invisible");
    error.innerHTML = errorMessage;
    return;
  }

  sessionStorage.setItem(title, `${title}\t${time}min`);
  displaySessionStorage();
}

function eventSubmit() {
  resetErrors();

  const title = document.getElementById("title_event").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  const pattern = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

  let errorMessage = "";
  let canSubmit = true;

  let ids = [];

  if (title.trim() == "") {
    errorMessage = "Veuillez donner un titre non vide";
    canSubmit = false;
    ids.push("title_event");
  }

  if (sessionStorage.getItem(title.trim()) != null) {
    errorMessage = "Tâche déjà existante";
    canSubmit = false;
    ids.push("title_event");
  }

  if (!pattern.test(start)) {
    errorMessage = "Veuillez enter une valeur dans le format HH:MM";
    canSubmit = false;
    ids.push("start");
  }

  if (!pattern.test(end)) {
    errorMessage = "Veuillez enter une valeur dans le format HH:MM";
    canSubmit = false;
    ids.push("end");
  }

  if (!canSubmit) {
    event.preventDefault();
    ids.forEach((i) => {
      const error = document.querySelector(`#${i} ~ p`);
      error.classList.remove("invisible");
      error.innerHTML = errorMessage;
    });
    return;
  }

  sessionStorage.setItem(title, `${title}\t${start}\t${end}`);
  displaySessionStorage();
}

function displaySessionStorage() {
  document.querySelector(".elems").innerHTML = "";
  for (let i = 0; i < sessionStorage.length; i++) {
    const content = sessionStorage.getItem(sessionStorage.key(i)).split("\t");
    const template = document.querySelector("template");
    const clone = template.content.cloneNode(true).firstElementChild;
    if (content.length == 2) {
      clone.children[0].innerHTML = content[0];
      clone.children[1].innerHTML = content[1];
      // document.querySelector(".elems").appendChild(clone);
    } else if (content.length == 3) {
      clone.children[0].innerHTML = content[0];
      clone.children[1].innerHTML = `${content[1]} - ${content[2]}`;
    }
    document.querySelector(".elems").appendChild(clone);
  }
}

function deleteEntry(event) {
  const elem = event.target.parentNode;
  const key = elem.children[0].innerHTML;
  sessionStorage.removeItem(key);
  displaySessionStorage();
}

// Sync on page load
displaySessionStorage();
