const taskTitle = document.getElementById("title_task");
const taskPlaceholders = [
  "Faire la vaiselle",
  "Faire son lit",
  "Appeler mon banquier",
  "Rapeller grand-mère",
];

taskTitle.placeholder =
  taskPlaceholders[Math.floor(Math.random() * taskPlaceholders.length)];
