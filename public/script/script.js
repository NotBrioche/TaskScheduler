function formSubmit() {
  const form = document.forms["input"];
  console.log(form);

  const task = [];
  const appoint = [];
  let valid = true;
  let errorMessage = "";

  for (let i = 0; i < 3; i++) {
    task.push(form[i]);
    appoint.push(form[i + 3]);
  }

  if (task[0].value.trim() == "" && appoint[0].value.trim() == "") {
    valid = false;
    errorMessage = "You must at least fill one field";
  } else {
    if (task[0].value.trim() != "") {
      if (task[1].value == "") {
        valid = false;
        errorMessage = "You must set the time needed for a task";
      } else {
        sessionStorage.setItem(
          task[0].value.trim(),
          `Task\t${task[0].value.trim()}\t${task[1].value}\t${task[2].value}`
        );
      }
    }

    if (appoint[0].value.trim() != "") {
      if (appoint[1].value != "" && appoint[2].value != "") {
        sessionStorage.setItem(
          appoint[0].value.trim(),
          `Appointment\t${appoint[0].value.trim()}\t${appoint[1].value}\t${
            appoint[2].value
          }`
        );
      } else {
        valid = false;
        errorMessage = "You must enter a start and an end hour";
      }
    }
  }

  if (!valid) {
    const error = document.querySelector(".error");
    error.innerHTML = errorMessage;
    error.classList.remove("hidden");
  }

  event.preventDefault();
  displaySessionStorage();
}

function displaySessionStorage() {
  document.querySelector(".elements").innerHTML = "";
  for (let i = 0; i < sessionStorage.length; i++) {
    const content = sessionStorage.getItem(sessionStorage.key(i)).split("\t");
    const template = document.querySelector("template.task");
    const clone = template.content.cloneNode(true).firstElementChild;
    if (content[0] == "Task") {
      clone.children[0].innerHTML = content[1];
      clone.children[1].innerHTML = content[2] + "min";
    } else if (content[0] == "Appointment") {
      clone.children[0].innerHTML = content[1];
      clone.children[1].innerHTML = `${content[2]} - ${content[3]}`;
    }

    document.querySelector(".elements").appendChild(clone);
  }

  const generate = document.querySelector(".generate");
  if (document.querySelector(".elements").children.length < 1) {
    generate.children[generate.children.length - 1].disabled = true;
  } else {
    generate.children[generate.children.length - 1].disabled = false;
  }
}

function deleteEntry(event) {
  const elem = event.target.parentNode.parentNode;
  const key = elem.children[0].innerHTML;
  sessionStorage.removeItem(key);
  displaySessionStorage();
}

async function generateResult() {
  const tasksObj = new Object();
  const tasks = [];

  for (let i = 0; i < sessionStorage.length; i++) {
    const obj = new Object();
    const elements = sessionStorage.getItem(sessionStorage.key(i)).split("\t");
    obj.name = elements[1];

    if (elements[0] == "Task") {
      obj.time_to_do = parseInt(elements[2]);
    } else if (elements[0] == "Appointment") {
      const d = new Date();
      for (let j = 0; j < 2; j++) {
        const hm = elements[j + 2].split(":");
        const dateStr = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDay(),
          hm[0],
          hm[1]
        ).toISOString();

        if (j == 0) obj.start = dateStr.substring(0, dateStr.length - 5);
        else obj.end = dateStr.substring(0, dateStr.length - 5);
      }
    }

    tasks.push(obj);
  }

  tasksObj.tasks = tasks;
  const range = new Object();

  const form = document.querySelector("#range");

  const start = form[0].value.split(":");
  const end = form[1].value.split(":");
  const d = new Date();

  range.start = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDay(),
    start[0],
    start[1]
  ).toISOString();
  range.end = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDay(),
    end[0],
    end[1]
  ).toISOString();
  tasksObj.range = range;
  const results = document.querySelector(".results");

  results.innerHTML = `<div class="date">${new Date().toLocaleDateString()}</div>`;

  await fetch("http://localhost:3500/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasksObj),
  }).then((text) =>
    text.text().then((data) => {
      const uuid = self.crypto.randomUUID();
      sessionStorage.setItem(uuid, data);
      window.location.href = `results.html?uuid=${uuid}`;
    })
  );
}
// Show storage on startup
displaySessionStorage();
