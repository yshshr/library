const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  
  info(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'have' : 'not'} read yet`;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read = false) {
  const book = new Book(title, author, pages, read)
  myLibrary.push(book);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295 );
addBookToLibrary('西游记', '吴承恩', 750);
addBookToLibrary('水浒传', '施耐庵', 850);
addBookToLibrary('三国演义', '罗贯中', 1350);
addBookToLibrary('红楼梦', '曹雪芹' ,1150);



function displayBooks() {
  const booktable = document.querySelector('.booktable');
  while(booktable.children.length > 1) {
    booktable.removeChild(booktable.lastElementChild);
  }

  for(const book of myLibrary) {
    booktable.appendChild(createBookTrNode(book));
  }
}

function createBookTrNode(book) {
  const tr = document.createElement('tr');
  const titleth = document.createElement('th');
  titleth.textContent = book.title;
  tr.appendChild(titleth);
  const authortd = document.createElement('td');
  authortd.textContent = book.author;
  tr.appendChild(authortd);
  const pagestd = document.createElement('td');
  pagestd.textContent = book.pages;
  tr.appendChild(pagestd);
  const readtd = document.createElement('td');
  readtd.textContent = book.read ? '已读' : '未读';
  tr.appendChild(readtd);
  const operatetd = document.createElement('td');
  const opbtn = document.createElement('button');
  opbtn.textContent = '移除';
  opbtn.addEventListener('click',removeBookHandler);
  operatetd.appendChild(opbtn);
  const readStaBtn = document.createElement('button');
  readStaBtn.textContent = '修改已读状态';
  readStaBtn.addEventListener('click',toogleReadStatusHandler);
  operatetd.appendChild(readStaBtn);
  tr.appendChild(operatetd);  
  tr.dataset.id = book.id;
  return tr;
}

function removeBookHandler(e){
  const trRow = e.target.parentElement.parentElement;
  const bookId = trRow.dataset.id;
  const removedBookIndex = myLibrary.findIndex((book)=>book.id === bookId);
  myLibrary.splice(removedBookIndex,1);  
  trRow.parentElement.removeChild(trRow);
}

function toogleReadStatusHandler(e){
  const trRow = e.target.parentElement.parentElement;
  const bookId = trRow.dataset.id;
  const toggleBook = myLibrary.find((book)=>book.id === bookId);
  toggleBook.toggleReadStatus();
  displayBooks();
}

displayBooks();

const addbookBtn = document.querySelector('.addbook-btn');
const bookDialog = document.querySelector('.book-dialog');
const confirmBtn = document.querySelector('#confirm');
const bookForm = document.querySelector('.book-form');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#book-pages');

addbookBtn.addEventListener('click',()=>{
  bookDialog.showModal();
})
confirmBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  if(!bookTitleHandler() || !bookAuthorHandler() || !bookPagesHandler()) {
    return;
  }
  const titleInput = document.querySelector('#book-title');
  const authorInput = document.querySelector('#book-author');  
  const pagesInput = document.querySelector('#book-pages');
  const readRadio = document.querySelector("input[name='bookRead']:checked");
  const bookRead = (readRadio ? (readRadio.value === 'readed' ? true : false) : false);
  addBookToLibrary(titleInput.value, authorInput.value, Number(pagesInput.value), bookRead);
  displayBooks();
  bookForm.reset();
  bookDialog.close();
})

bookTitle.addEventListener('input', bookTitleHandler);
bookTitle.addEventListener('focusout', bookTitleHandler);
bookAuthor.addEventListener('input', bookAuthorHandler);
bookAuthor.addEventListener('focusout', bookAuthorHandler);
bookPages.addEventListener('input', bookPagesHandler);
bookPages.addEventListener('focusout', bookPagesHandler);


function bookTitleHandler() {
  if(bookTitle.validity.valueMissing) {
    showError('#book-title', '书名是必填项！');
    bookTitle.setCustomValidity('书名是必填项！');
    return false;
  } else {
    clearError('#book-title');
    bookTitle.setCustomValidity('');
    return true;
  }
}

function bookAuthorHandler() {
  if(bookAuthor.validity.valueMissing) {
    showError('#book-author', '作者是必填项！');
    bookAuthor.setCustomValidity('作者是必填项！');
    return false;
  } else {
    clearError('#book-author');
    bookAuthor.setCustomValidity('');
    return true;
  }
}

function bookPagesHandler() {
  if(bookPages.validity.valueMissing) {
    showError('#book-pages', '页数是必填项！');
    bookPages.setCustomValidity('页数是必填项！');
    return false;
  } else {
    clearError('#book-pages');
    bookPages.setCustomValidity('');
    return true;
  }
}

function showError(elementSelector, errorMsg) {
  const span = document.querySelector(`${elementSelector} + span`);
  span.textContent = errorMsg;
  span.className = 'error active';
}

function clearError(elementSelector) {
  const span = document.querySelector(`${elementSelector} + span`);
  span.textContent = '';
  span.className = 'error';
}
