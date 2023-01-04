function takeNotes(title, text, note_id) {
    this.title = title;
    this.text = text;
    this.note_id = note_id;
}

exports.module = takeNotes;

const renderActiveNote = () => {
    hide(saveNoteBtn);
  
    if (activeNote.title === ) {
      noteTitle.setAttribute('readonly', true);
      noteText.setAttribute('readonly', true);
      noteTitle.value = activeNote.title;
      noteText.value = activeNote.text;
    } else {
      noteTitle.removeAttribute('readonly');
      noteText.removeAttribute('readonly');
      noteTitle.value = '';
      noteText.value = '';
    }
  };

  async function loadDB() {
    const response = await fetch('/api/notes');
    const data = await response.json();
    console.log(data);
  }

  loadDB();

//  function dataBase() {
//     const data = fetch('/api/')
//  }