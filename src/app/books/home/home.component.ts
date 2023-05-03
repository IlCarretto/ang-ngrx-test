import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/books.selector';
import { callBooksAPI, callDeleteBookAPI } from '../store/books.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

declare var window:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    ) {}

  books$ = this.store.pipe(select(selectBooks))
  deleteModal:any;
  idToDelete:number = 0;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    );
    this.store.dispatch(callBooksAPI());
  }

  openDeleteModal(id:number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  confirmDelete() {
    this.store.dispatch(callDeleteBookAPI({id: this.idToDelete}));
    let appStatus$ = this.appStore.pipe(select(selectAppState))
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(setAPIStatus({apiStatus: {apiStatus: '', apiResponseMessage: ''}}))
      }
      this.deleteModal.hide();
    })
  }
}
