import { createAction, props } from "@ngrx/store";
import { Book } from "./book";


export const callBooksAPI = createAction(
  '[Books API] fetch books API data'
)

export const booksFetchSuccess = createAction(
  "[Books API] fetch books API success",
  props<{allBooks:Book[]}>()
)

export const addBookAPI = createAction(
  "[Books API] call add book API",
  props<{payload:Book}>()
)

export const addBookAPISuccess = createAction(
  "[Books API] add book API success",
  props<{response:Book}>()
)

export const callUpdateBookAPI = createAction(
  "[Books API] call update book API",
  props<{payload:Book}>()
)

export const updateBookAPISuccess = createAction(
  "[Books API] call update book API success",
  props<{response:Book}>()
)

export const callDeleteBookAPI = createAction(
  "[Books API] call delete book API",
  props<{id:number}>()
)

export const deleteBookAPISuccess = createAction(
  "[Books API] call delete book API success",
  props<{id:number}>()
)
