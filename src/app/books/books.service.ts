import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Book } from './store/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>("http://localhost:3000/books")
  };

  addBooks(payload:Book) {
    return this.http.post<Book>("http://localhost:3000/books", payload);
  }

  updateBook(payload:Book) {
    return this.http.put<Book>(`http://localhost:3000/books/${payload.id}`, payload);
  }

  deleteBook(id:number) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }
}
