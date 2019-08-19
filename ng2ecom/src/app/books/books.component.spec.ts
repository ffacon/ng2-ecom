import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BooksService } from '../services/books.service';
import { asyncData } from '../test/mocks/async-observable-helper';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let getBooksSpy: jasmine.Spy;
  const mockBooksService = jasmine.createSpyObj('bookService', ['getBooks', 'getBook']);

  const fakeBook = { id : 12, name: 'Devenez un ninja avec Angular', author: 'Ninja-Squad',
                     price: 1, description: 'Devenir un Ninja avec Angular',
                     category: 'book', isNew: false,
                     comments: [ { rate: 5, user: 'Facon François', comment: 'En Français.' } ]
  };

  beforeEach(async(() => {
    // mockBooksService = createBooksServiceSpy();
    TestBed.configureTestingModule({
      declarations: [ BooksComponent ],
      imports: [ RouterTestingModule],
      providers: [
        {provide: BooksService, useValue: mockBooksService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // Simulate delayed observable values with the `asyncData()` helper
    getBooksSpy = mockBooksService.getBooks.and.returnValue(asyncData(fakeBook));
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
