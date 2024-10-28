import { Book, Format, Status } from "./book"

function getCurrentEntryBook(): Book {
  const title = document.querySelector<HTMLInputElement>("#title")
    ?.value as string
  const author = document.querySelector<HTMLInputElement>("#author")
    ?.value as string
  const pages = +(document.querySelector<HTMLInputElement>("#numpages")
    ?.value as string)

  const statusNode: any = document.querySelector("#status")
  const status = statusNode.value as Status

  const price = +(document.querySelector<HTMLInputElement>("#price")
    ?.value as string)

  const formatNode: any = document.querySelector("#format")
  const format = formatNode.value as Format

  const suggested_by = document.querySelector<HTMLInputElement>("#suggested_by")
    ?.value as string

  const book = new Book(
    title,
    author,
    pages,
    status,
    price,
    0,
    format,
    suggested_by,
    false
  )

  return book
}

function addBook() {
  const book = getCurrentEntryBook()
  if (
    !book.suggested_by ||
    !book.pages ||
    !book.format ||
    !book.author ||
    !book.status ||
    !book.title ||
    !book.price
  ) {
    alert("Please fill all inputs")
    return
  }

  const bookContent = Object.keys(book).map((key, index) => {
    const e = document.createElement("p")
    const fieldName = key[0].toUpperCase() + key.slice(1)
    if (fieldName === "NumPagesRead") {
      let percentage = (book as any)[key]
      percentage = (+percentage / +book.pages) * 100
      e.textContent = `${fieldName}: ${percentage}%`
    } else {
      e.textContent = `${fieldName}: ${(book as any)[key]}`
    }
    if (index !== 8) e.textContent += ", "
    e.className = "mx-2"
    return e
  })

  const div = document.createElement("div")
  div.className = "flex"
  div.append(...bookContent)

  booksDiv?.append(div)
  console.log("A book has been added!")
}

const booksDiv = document.getElementById("books")

const addButton = document.getElementById("add")

addButton?.addEventListener("click", (_e) => {
  addBook()
})
