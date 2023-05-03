import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { addBookAPISuccess, booksFetchSuccess, deleteBookAPISuccess, updateBookAPISuccess } from "./books.action";


export const initialState: ReadonlyArray<Book> = [
  // {
  //   "id": 1,
  //   "title": "Harry Potter",
  //   "author": "J.K. Rowling",
  //   "price": 15
  // }
];

export const bookReducer = createReducer(
  initialState,
  on(booksFetchSuccess, (state, {allBooks}) => {
    return allBooks;
  }),
  on(addBookAPISuccess, (state, {response}) => {
    let newState = [...state];
    newState.unshift(response);
    return newState;
  }),
  on(updateBookAPISuccess, (state, {response}) => {
    let newState = state.filter(_ => _.id !== response.id);
    newState.unshift(response);
    return newState;
  }),
  on(deleteBookAPISuccess, (state, {id}) => {
    let newState = state.filter(_ => _.id !== id);
    return newState;
  })
)
