const $ = (id) => document.getElementById(id);

const createButton = $("create-btn");
const cancelButton = $("cancel-btn");
const createLayout = $("create-layout");
const saveNotesEl = $("save-notes");
const input = $("input-value");
const textArea = $("textarea-value");
const viewLayout = $("view-layout");
const viewText = $("view-text");
const viewTitle = $("view-title");
const deleteButton = $("delete-btn");

let activeNote = -1;

const welcomeView = {
  el: $("default-layout"),
  show() {
    createLayout.style.display = "none";
    viewLayout.style.display = "none";
    this.el.style.display = "flex";
  },
  hide() {
    this.el.style.display = "none";
  },
};

function showAddNotes() {
  createLayout.style.display = "flex";
  welcomeView.hide();
  viewLayout.style.display = "none";
}

function hideAddNotes() {
  createLayout.style.display = "none";
  welcomeView.show();
  viewLayout.style.display = "none";
}

const localDB = [];
const localValue = localStorage.getItem("notes");

let localStorageValue;
try {
  localStorageValue = JSON.parse(localValue ?? "[]");
} catch (error) {
  localStorageValue = [];
}

localStorageValue.forEach((note, id) => {
  renderNote(note, id);
});

const saveTolocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(localDB));
};

function saveNotes() {
  const title = input.value;
  const text = textArea.value;
  viewLayout.style.display = "none";
  renderNote({ title, text });
  localDB.push({ title, text });
  saveTolocalStorage();
  input.value = "";
  textArea.value = "";
  hideAddNotes();
}

function renderNote({ title, text }, id) {
  const div = document.createElement("div");

  div.addEventListener("click", () => {
    welcomeView.hide();
    viewLayout.style.display = "flex";
    viewTitle.innerText = `${title}`;
    viewText.innerText = `${text}`;
    activeNote = id;
  });
  const h1 = document.createElement("h1");
  h1.innerText = `${title}`;
  div.id = `note-${id}`;
  div.appendChild(h1);
  $("left-body").appendChild(div);
}

function deleteNotes() {
  localStorageValue.splice(activeNote, 1);
  $(`note-${activeNote}`).remove();
  localStorage.setItem("notes", localStorageValue);
  welcomeView.show();
}

saveNotesEl.addEventListener("click", saveNotes);
createButton.addEventListener("click", showAddNotes);
cancelButton.addEventListener("click", hideAddNotes);
deleteButton.addEventListener("click", deleteNotes);
