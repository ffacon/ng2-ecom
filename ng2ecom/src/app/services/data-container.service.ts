import { Injectable } from '@angular/core';
import { Book } from '../beans/book';

@Injectable({
  providedIn: 'root'
})
export class DataContainerService {

  filteredBooks: Book[];
  constructor() { }
}
