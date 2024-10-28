import { Book, Format, Status } from "./book"

let books: Book[] = []

function getCurrentEntryBook(): Book {
  const title = document.querySelector("#title")?.textContent as string
  const author = document.querySelector("#author")?.textContent as string
  const pages = +(document.querySelector("#pages")?.textContent as string)
  const status = document.querySelector("#status")
    ?.textContent as string as Status
  const price = +(document.querySelector("#price")?.textContent as string)
  const numPagesRead = +(document.querySelector("#numPagesRead")
    ?.textContent as string)
  const format = document.querySelector("#format")?.textContent as Format
  const suggested_by = document.querySelector("#suggested_by")
    ?.textContent as string

  const book = new Book(
    title,
    author,
    pages,
    status,
    price,
    numPagesRead,
    format,
    suggested_by,
    false
  )

  return book
}

const booksDiv = document.getElementById("books")

console.log(getCurrentEntryBook())
