import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book } from "./book";

export const selectBooks = createFeatureSelector<Book[]>('mybooks');

export const selectBookById = (bookId: number) => {
  return createSelector(selectBooks, (books: Book[]) => {
    let bookById = books.filter((book: Book) => book.id === bookId);
    if (bookById.length === 0) {
      return null;
    }
    return bookById[0];
  })
}
