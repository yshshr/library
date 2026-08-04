const myLibrary = [];

function Book(title, author, pages, read = false) {
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


function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages)
  myLibrary.push(book);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295 );
addBookToLibrary('西游记', '吴承恩', 750);
addBookToLibrary('水浒传', '施耐庵', 850);
addBookToLibrary('三国演义', '罗贯中', 1350);
addBookToLibrary('红楼梦', '曹雪芹' ,1150);

for(const book of myLibrary) {
  console.log(book);
}