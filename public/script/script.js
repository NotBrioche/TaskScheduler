const taskTitle = document.getElementById("title_task");
const taskPlaceholders = [
  "Faire la vaiselle",
  "Faire son lit",
  "Appeler mon banquier",
  "Rapeller grand-mère",
];

taskTitle.placeholder =
  taskPlaceholders[Math.floor(Math.random() * taskPlaceholders.length)];

function taskSubmit() {
  const title = document.getElementById("title_task").value;

  // No verification (HTML doing it all)
  const time = document.getElementById("time").value;

  let errorMessage = "";
  let canSubmit = true;

  if (title.trim() == "") {
    errorMessage = "Veuillez donner un titre non vide";
    canSubmit = false;
  }

  if (sessionStorage.getItem(title) != null) {
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

function displaySessionStorage() {
  document.querySelector(".elems").innerHTML = "";
  for (let i = 0; i < sessionStorage.length; i++) {
    const content = sessionStorage.getItem(sessionStorage.key(i)).split("\t");
    if (content.length > 1) {
      const template = document.querySelector("template");
      const clone = template.content.cloneNode(true).firstElementChild;

      clone.children[0].innerHTML = content[0];
      clone.children[1].innerHTML = content[1];
      document.querySelector(".elems").appendChild(clone);
    }
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
