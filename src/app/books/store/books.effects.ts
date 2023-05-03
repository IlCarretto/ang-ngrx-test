import {Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BooksService } from '../books.service';
import { addBookAPI, addBookAPISuccess, booksFetchSuccess, callBooksAPI, callDeleteBookAPI, callUpdateBookAPI, deleteBookAPISuccess, updateBookAPISuccess } from './books.action';
import {EMPTY, map, switchMap, withLatestFrom} from "rxjs";
import { Appstate } from 'src/app/shared/store/appstate';
import { Store, select } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectBooks } from './books.selector';

@Injectable()
export class BooksEffects {
  constructor (
    private actions$:Actions,
    private bookService:BooksService,
    private appStore:Store<Appstate>,
    private store:Store
   ) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(callBooksAPI),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      switchMap(([, booksFromStore]) => {
        if (booksFromStore.length > 0) {
          return EMPTY;
        }
        return this.bookService.getBooks()
        .pipe(map((data) => booksFetchSuccess({allBooks: data})))
      })
    )
  );

  addNewBook$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addBookAPI),
        switchMap((action) => {
          this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage: '', apiStatus: ''}}))
          return this.bookService
          .addBooks(action.payload)
          .pipe(map((data) => {
            this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage: 'API add dispatched successfully', apiStatus: 'success'}}))
            return addBookAPISuccess({response: data})
          }))
        })
      )
  )

  updateBook$ = createEffect(() =>
      this.actions$.pipe(
        ofType(callUpdateBookAPI),
        switchMap((action) => {
          this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage: '', apiStatus: ''}}))
          return this.bookService
          .updateBook(action.payload)
          .pipe(map((data) => {
            this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage: 'API edit dispatched successfully', apiStatus: 'success'}}))
            return updateBookAPISuccess({response: data})
          }))
        })
      )
  )

  deleteBook$ = createEffect(() =>
      this.actions$.pipe(
        ofType(callDeleteBookAPI),
        switchMap((action) => {
          this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage: '', apiStatus: ''}}))
          return this.bookService
          .deleteBook(action.id)
          .pipe(map((data) => {
            this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage: 'API delete dispatched successfully', apiStatus: 'success'}}))
            return deleteBookAPISuccess({id: action.id})
          }))
        })
      )
  )
}
