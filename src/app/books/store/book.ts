import { Appstate } from "src/app/shared/store/appstate"

export interface Book {
  id: number,
  title: string,
  author: string,
  price: number
}

export interface BookState {
  books: Book[],
  bookStatus: Appstate
}
