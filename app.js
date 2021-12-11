const button = document.querySelector('.button-submit');
const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const selectCategories = document.querySelector('.categories-select');
const selectPriorities = document.querySelector('.priorities-select');
const table = document.querySelector('table');
const body = document.querySelector('body');
const titleError = document.querySelector('.title-error');
const authorError = document.querySelector('.author-error');

document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
  const books = getFromLocalStorage();
  if (books.length !== 0) {
    table.style.opacity = '1';
    books.forEach((book) => addBookToList(book));
  }
}

button.addEventListener('click', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  if (checkForErrors()) return;
  table.style.opacity = '1';
  const position = {
    title: inputTitle.value,
    author: inputAuthor.value,
    category: selectCategories.value,
    priority: selectPriorities.value,
  };
  inputTitle.value = '';
  inputAuthor.value = '';
  saveToLocalStorage(position);
  addBookToList(position);
}

function checkForErrors() {
  titleError.style.display = 'none';
  authorError.style.display = 'none';
  let error = false;
  if (inputTitle.value.trim().length < 1) {
    titleError.style.display = 'block';
    error = true;
  }
  if (inputAuthor.value.trim().length < 3) {
    authorError.style.display = 'block';
    error = true;
  }
  if (error) return true;
  return false;
}

function saveToLocalStorage(book) {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function getFromLocalStorage() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}

function addBookToList(book) {
  const row = document.createElement('tr');
  for (let i in book) {
    const td = document.createElement('td');
    td.innerText = book[i];
    row.appendChild(td);
  }
  table.appendChild(row);
}
