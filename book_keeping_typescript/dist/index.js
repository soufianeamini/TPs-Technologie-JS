"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("./book");
let books = [];
function getCurrentEntryBook() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const title = (_a = document.querySelector("#title")) === null || _a === void 0 ? void 0 : _a.textContent;
    const author = (_b = document.querySelector("#author")) === null || _b === void 0 ? void 0 : _b.textContent;
    const pages = +((_c = document.querySelector("#pages")) === null || _c === void 0 ? void 0 : _c.textContent);
    const status = (_d = document.querySelector("#status")) === null || _d === void 0 ? void 0 : _d.textContent;
    const price = +((_e = document.querySelector("#price")) === null || _e === void 0 ? void 0 : _e.textContent);
    const numPagesRead = +((_f = document.querySelector("#numPagesRead")) === null || _f === void 0 ? void 0 : _f.textContent);
    const format = (_g = document.querySelector("#format")) === null || _g === void 0 ? void 0 : _g.textContent;
    const suggested_by = (_h = document.querySelector("#suggested_by")) === null || _h === void 0 ? void 0 : _h.textContent;
    const book = new book_1.Book(title, author, pages, status, price, numPagesRead, format, suggested_by, false);
    return book;
}
const booksDiv = document.getElementById("books");
console.log(getCurrentEntryBook());
