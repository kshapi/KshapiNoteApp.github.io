const newNote = document.querySelector('.fa-plus');
const pad = document.querySelector('.pad');
const content = document.querySelector('.main');
const addNote = document.querySelector('.fa-check');
const noteTitle = document.querySelector('.pad input');
const noteText = document.querySelector('.pad textarea');
const backBtn = document.querySelector('.fa-arrow-left');
const search = document.querySelector('.search');

let notes = [];


//load notes when page loaded
const loadNotes = () => {
  
  if (localStorage.getItem('notes')) {
    //LocalStorage Notes
    const localNotes = JSON.parse(localStorage.getItem('notes'));
    //Fetch Note To DOM When page loaded
    for(note of localNotes) {
      notes.push(note);
      content.innerHTML += `
        <div class="note">
          <h2 class="title">${note.title}</h2>
          <p class="text">${note.text}</p>
          <i class="fa-solid fa-trash" onclick='deleteNote(event)'></i>
          <span class="date">
            ${note.date[0]}/
            ${note.date[1]}/
            ${note.date[2]}
          </span>
        </div>
        `;
    };
    //Check there is any notes or its empty
    if (localNotes[0] !== undefined) {
      document.querySelector('.empty').style.display = 'none';
    }else {
      document.querySelector('.empty').style.display = 'block';
    };
    
  };
};
window.addEventListener('load',loadNotes);

//Create a New Note 
const createNewNote = (e) => {
  pad.style.display = 'block';
};
newNote.addEventListener('click',createNewNote);

//Add a new Note
const addNewNote = () => {
  const date = new Date();
  //Checking both field
  if (noteText.value !== '' &&
      noteTitle.value !== '') {
    pad.style.display = 'none';
    document.querySelector('.empty').style.display = 'none';
    //Seting Note in DOM
    content.innerHTML += `
     <div class="note">
       <h2 class="title">${noteTitle.value}</h2>
        <p class="text">${noteText.value}</p>
        <i class="fa-solid fa-trash" onclick='deleteNote(event)'></i>
        <span class="date">
        ${date.getDate()}/
        ${date.getMonth()+1}/
        ${date.getFullYear()}
        </span>
     </div>`;
    //Notes Object
    const myNote = {
      title: noteTitle.value,
      text: noteText.value,
      date: [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    };
    notes.push(myNote)
    
    //Set anto localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
    //inputs value
    noteText.value = '';
    noteTitle.value = '';
    
  };
  
};
addNote.addEventListener('click',addNewNote);


//Back Arrow Button
const back = () => {
  pad.style.display = 'none';
};
backBtn.addEventListener('click',back);


//Deleting Note
const deleteNote = (e) => {
  //get the element
  const del = e.target.parentNode;
  del.style.transform = 'translate(-60px)';
    //deleting after 200 ms
    setTimeout(()=> {
      del.remove();
    }, 240);
    
  const title = del.querySelector('.title').innerText;
    
  notes = [];
  //Update LacalStorage
  const allNotes = JSON.parse(localStorage.getItem('notes'));
  //Looping Note
  for(note of allNotes) {
    if (note.title == title) {
      continue;
    }else {
      notes.push(note);
    };
  };
  //Updating localStorage
  localStorage.setItem('notes', JSON.stringify(notes));
};


const searchNote = (e) => {
  let searchCount = 0;
  //Search input Value
  const word = e.target.value.toLowerCase();
  //All Notes
  const notes = document.querySelectorAll('.main .note');
  
  //Loopoing All Notes
  for (let i=0;i<notes.length;i++){
    //Note Title
      const title = notes[i].querySelector('h2').innerText.toLowerCase();
    //Note Text
      const text = notes[i].querySelector('p').innerText.toLowerCase();
    //Chech if search value match in title or Text
      if (title.includes(word) ||    text.includes(word)) {
        //Show the notes wich have search value
         notes[i].style.display = 'block';
      }else {
         //Other Wise display none to others
         notes[i].style.display = 'none';
         searchCount++;
        
     };
    //if nothing match then show not Found
    if (searchCount >= notes.length) {
      document.querySelector('.notFound').style.display = 'block';
    }else {
      document.querySelector('.notFound').style.display = 'none';
    };
    
  };
  
};

search.addEventListener('input', searchNote);

//Kshapi