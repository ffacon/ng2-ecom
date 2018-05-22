import { Injectable } from '@angular/core';
import { Book } from '../../../../express/app/src/beans/book';

@Injectable({
  providedIn: 'root'
})
export class DataContainerService {
  
  filteredBooks: Book[];
  constructor() { }
}
