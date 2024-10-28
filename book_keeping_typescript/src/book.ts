type Status =
  | "Read"
  | "Re-read"
  | "DNF"
  | "Currently reading"
  | "Returned Unread"
  | "Want to read"

type Format = "Print" | "PDF" | "Ebook" | "AudioBook"

class Book {
  title: string
  author: string
  pages: number
  status: Status
  price: number
  numPagesRead: number
  format: Format
  suggested_by: string
  finished: boolean

  constructor(
    title: string,
    author: string,
    pages: number,
    status: Status,
    price: number,
    numPagesRead: number,
    format: Format,
    suggested_by: string,
    finished?: boolean
  ) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.price = price
    this.numPagesRead = numPagesRead
    this.format = format
    this.suggested_by = suggested_by
    this.finished = finished ?? false
  }

	currentlyAt(): number {
		return this.numPagesRead + 1
	}

	deleteBook(): void {
		// TODO: Figure out what to delete exactly
		console.log("Delete self?")
	}
}
