import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyZoneComponent } from './buy-zone.component';
import { Book } from '../beans/book';
import { MockUserService } from '../test/mocks/user.service';
import { UserService } from '../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpResponse, HttpClient,HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../services/local-Storage.service';

describe('BuyZoneComponent', () => {
  let component: BuyZoneComponent;
  let fixture: ComponentFixture<BuyZoneComponent>;
  let expectedbook: Book;
  let de:      DebugElement;
  let el:      HTMLElement;
  let mockUserService: MockUserService;
  let userService:UserService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  mockUserService = new MockUserService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyZoneComponent ],
      imports: [ RouterTestingModule,HttpClientModule,HttpClientTestingModule],
      providers: [
          {provide: UserService, useClass: UserService},
          {provide: LocalStorageService, useClass: LocalStorageService}, ]
    })
    .compileComponents();
    userService=TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyZoneComponent);
    component = fixture.componentInstance;
    expectedbook = {
			"id": 1,
			"name": "AngularJS",
			"author": "Brad Green, Shyam Seshadri",
			"price": 15.34,
			"description": "Description...", 
			"category": "book", 
			"isNew": false,
			"comments": [	]
		
    };
  
    component.book = expectedbook;
    httpClient=TestBed.get(HttpClient);
    userService=TestBed.get(UserService);
    httpTestingController=TestBed.get(HttpTestingController);
  });
  afterEach(()=> {
    httpTestingController.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('# authentification user ...', ()=>{

    beforeEach(()=>{
      const body=JSON.parse('{"login":"admin","password":"password","firstName": "john", "lastName": "doe", "nbItems": 0 }');
      const url = `/api/app/login`;
      const  user={ login: 'admin', password:'password', firstName: "john", lastName: "doe", nbItems: 0 };
  
      userService.login(body.login,body.password).subscribe(
        data => expect(data).toEqual(body, 'should return the user'),
        fail
      );
      // UserService should have made one request 
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      
      req.flush(user);

      expect(userService.isLogged).toBe(true);
      fixture.detectChanges();
    });

    it('should display Add to basket',()=>{

      de=fixture.debugElement.query(By.css('.buyZone'));
      el=de.nativeElement;
      expect(el.querySelector('p').textContent).toContain("Add to basket");
    })

    it('Add book to the basket',()=>{

      component.addToBasket(component.book);
      expect(component.addToBasket).toBeTruthy();
    })
  })

});
