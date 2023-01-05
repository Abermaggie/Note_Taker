let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;
let clickable;
let noteDash = document.getElementById('note-title');
let noteWrite = document.getElementById('note-textarea');

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
  clickable = document.getElementById('list-group-item');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hide(saveNoteBtn);
  if (activeNote.id) {
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

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).note_id;
  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};



// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  } 

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('button');
    liEl.classList.add('list-group-item');
    liEl.setAttribute("id", "list-group-item");
    liEl.addEventListener('click', handleNoteLoad);
    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.setAttribute("id", 'list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };


  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}
// Get all notes, remove the note with the given id, write the filtered notes
// const removeNote = (id) => {
//   // Get all notes, remove the note with the given id, write the filtered notes
//   return this.getNotes()
//     .then((notes) => notes.filter((note) => note.id !== id))
//     .then((filteredNotes) => this.write(filteredNotes));
// }

getAndRenderNotes();

const handleNoteLoad = (e) => {
  const note = e.target;
  const innerText = note.innerHTML
  loadDB(innerText);
  };

async function loadDB(innerText) {
  const response = await fetch('/api/notes');
  const data = await response.json();
  for (var i= 0; i < data.length; i++) {
    if(innerText === data[i].title) {
      return noteDash.value = data[i].title, noteWrite.value= data[i].text;
    }
}};
  // const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;
  // // console.log(noteId);
  // const newNote = {
  //   title: noteTitle.value,
  //   text: noteText.value,
  // };
  // saveNote(newNote).then(() => {
  //   getAndRenderNotes();
  //   renderActiveNote();
  // });


// const handleClick = (e) => {
//   // Prevents the click listener for the list from being called when the button inside of it is clicked
//   e.stopPropagation();

//   const note = e.target;
//   console.log(note);
//   const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;
//   console.log(note);
//   if (activeNote.id === noteId) {
//     activeNote = {};
//   }
//   };

// const target = (e) => {
//   // Prevents the click listener for the list from being called when the button inside of it is clicked
//   // e.stopPropagation();

//   const note = e.target;
//   const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;
//   console.log(noteId);
// }

// target();
// const getData = () => getNotes().then(response);
// getData();

// const handleClick = (newEl) => {
// }
// let getTitle;
// let getCo;
// getCo = document.getElementById('list-group-item').data-note;
// getTitle = document.querySelectorAll('data-note');
// console.log(getCo);

// const handleNoteView = (e) => {
//   e.preventDefault();
//   activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
//   renderActiveNote();
// };


// clickable.addEventListener('click', console.log("hey there"))
// let innerText = clickable.attributes[2].textContent;
// console.log(innerText);

// console.log(newEl.innerHTML);

// async function loadDB(title) {
//       const response = await fetch('/api/notes');
//       const data = await response.json();
//       console.log(data);
//       console.log("Maggie");
//       for (var i= 0; i < data.length; i++) {
//         if(title === data[i].title) {
//           return noteDash.value = data[i].title, noteWrite.value= data[i].text;
//         }
//     }}
// loadDB("Clean House");


