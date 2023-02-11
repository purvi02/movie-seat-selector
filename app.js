const noteText = document.getElementById("note-text");
const saveButton = document.getElementById("save-button");
const noteList = document.getElementById("note-list");

saveButton.addEventListener("click", function() {
  const note = noteText.value;
  if (note) {
    const listItem = document.createElement("li");
    listItem.textContent = note;
    noteList.appendChild(listItem);
    noteText.value = "";
  }
});
//  add functionlality to delete note