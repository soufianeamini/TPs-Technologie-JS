"use strict";
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
}
