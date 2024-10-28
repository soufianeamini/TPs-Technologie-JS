"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(title, author, pages, status, price, numPagesRead, format, suggested_by, finished) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.numPagesRead = numPagesRead;
        this.format = format;
        this.suggested_by = suggested_by;
        this.finished = finished !== null && finished !== void 0 ? finished : false;
    }
    currentlyAt() {
        return this.numPagesRead + 1;
    }
    updatePagesRead(numPagesRead) {
        if (numPagesRead > this.pages) {
            numPagesRead = this.pages;
        }
        this.pages = numPagesRead;
    }
    deleteBook() {
        // TODO: Figure out what to delete exactly
        console.log("Delete self?");
    }
}
exports.Book = Book;
