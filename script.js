const myLibrary = [];
const table = document.querySelector("table");
const tableStructure = table.innerHTML;

// Book Constructor
function Book(title, author, page, isRead) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, page, isRead) {
  //   take input > create Book obj 
  let bookObj = new Book(title, author, page, isRead);
  // > add Book obj to myLibrary array
  myLibrary.push(bookObj);
}

addBookToLibrary("The Women", "Kristin Hannah", 300, false);
addBookToLibrary("Funny Story", "Emily Henry", 250, true );
addBookToLibrary("Onyx Storm", "Rebecca Yarros", 200, true);
displayLibrary();

const modal = document.querySelector("#modal");
const openButton = document.querySelector("#open_modal");

openButton.addEventListener("click", () => {
  modal.showModal();
});

const form = document.querySelector("#book-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let page = document.getElementById("page").value;
  let isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, page, isRead);
  displayLibrary();
  modal.close();
  return false;
});

function removeBook(index) {
  return myLibrary.splice(index, 1);
}

function displayLibrary() {
  // REMOVE books from the table
  table.replaceChildren();
  // ADD table caption and header
  table.innerHTML = tableStructure;
  // loop through each myLibrary element
  let index = 0;
  for (const book of myLibrary) {
    // create new row
    // attach newly created row to root table
    let row = table.insertRow();
    let table_cell;
    for (const key in book) {
      if (Object.hasOwnProperty.call(book, key) && key != 'isRead') {
        
        table_cell = row.insertCell();
        table_cell.textContent = book[key];
        // add each element to a td
      }
      // add read status button and changing it state after clicking
      if ((key == 'isRead') &&  book[key]) {
        table_cell = row.insertCell();
        let btn = document.createElement("button");
        btn.className = "read_btn";
        btn.textContent = "Read";
        btn.value = index;
        table_cell.appendChild(btn);
      } else if ((key == 'isRead') &&  !book[key]) {
        table_cell = row.insertCell();
        let btn = document.createElement("button");
        btn.className = "unread_btn";
        btn.textContent = "Unread";
        btn.value = index;
        table_cell.appendChild(btn);
      }
      

    }
    // add delete button
    table_cell = row.insertCell();
    let btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.className = "delete_btn";
    btn.value = index;
    
    index++;
    

    table_cell.appendChild(btn);

    // add read button
    // table_cell = row.insertCell();
    // btn = document.createElement("button");
    // btn.textContent = "Unread";
    // btn.className = "read_btn";
    // btn.value = index;

    // table_cell.appendChild(btn);
  }

  const delete_btn = document.querySelectorAll(".delete_btn");
  delete_btn.forEach(function (button) {
    button.addEventListener("click", DeleteEventHandler(button.value));
  });

  const read_btn = document.querySelectorAll(".read_btn");
  read_btn.forEach(function (button) {
    button.addEventListener("click", readStatusEvent());
  });

  const unread_btn = document.querySelectorAll(".unread_btn");
  unread_btn.forEach(function (button) {
    button.addEventListener("click", readStatusEvent());
  });


}

function DeleteEventHandler(index) {
  return (event) => {
    event.preventDefault();
    removeBook(index);
    displayLibrary();
  };
}


function readStatusEvent() {
  return function(event) {
    event.preventDefault();
    const book = myLibrary[this.value];
    book.isRead = !book.isRead;
    displayLibrary();
    console.log(myLibrary);
  };
}

console.log(myLibrary);