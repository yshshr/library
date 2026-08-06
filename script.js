const myLibrary = [];

function Book(title, author, pages, read) {
  if(!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'have' : 'not'} read yet`;
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
  return tr;
}

displayBooks();

const addbookBtn = document.querySelector('.addbook-btn');
const bookDialog = document.querySelector('.book-dialog');
const confirmBtn = document.querySelector('#confirm');
const bookForm = document.querySelector('.book-form');

addbookBtn.addEventListener('click',()=>{
  bookDialog.showModal();
})
confirmBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  const titleInput = document.querySelector('#book-title');
  const authorInput = document.querySelector('#book-author');  
  const pagesInput = document.querySelector('#book-pages');
  const readRadio = document.querySelector("input[name='bookRead']:checked");
  const bookRead = (readRadio ? (readRadio.value === 'readed' ? true : false) : false);
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, bookRead);
  const booktable = document.querySelector('.booktable');
  booktable.appendChild(createBookTrNode(myLibrary[myLibrary.length-1]));
  bookForm.reset();
  bookDialog.close();
})

