/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed,inject  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BasketComponent } from './basket.component';

import {FormsModule, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockRouter, MockActivatedRoute } from '../test/mocks/route';
import { MockUserService } from '../test/mocks/user.service';

import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-Storage.service';

import { HttpClientModule,HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User } from '../beans/user';
import { Basket } from '../beans/basket';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let mockUserService: MockUserService; 
  let userS:UserService;

  beforeEach(async(() => {
    mockUserService = new MockUserService();

    TestBed.configureTestingModule({
      declarations: [ BasketComponent ],
       imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      providers: [
        LocalStorageService,
        UserService,
        {provide: Router, useValue: MockRouter},
      ]
    }).compileComponents();
    userS=TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
  });

  it('should create', () =>{
    expect(component).toBeDefined();
    expect(component).toBeTruthy();
  });

  it('should render `Basket` in a h3 tag',()=>{
    de=fixture.debugElement.query(By.css('.k-info-block'));
    el=de.nativeElement;
    expect(el.querySelector('h3').textContent).toContain('Basket');
  });

  it('authentication with user',async(inject([HttpClient,HttpTestingController],
            (http:HttpClient, backend: HttpTestingController)=>{
    userS=TestBed.get(UserService);
    // _body : false coordinates
    let _body=JSON.parse('{"login":"log","password":"password"}');
    // the correct coordinates
    let body=JSON.parse('{"login":"admin","password":"password"}');
    console.log(body.login);
   
    userS.login(body.login,body.password).subscribe(
      (user:User)=> {  
        let islog=userS.isLogged;
        expect(islog).toBe(true);
        expect(userS.basket).toBeDefined();
        expect(userS.getUser).toBeDefined();
      },
      fail
    );
      backend.expectOne({
        url:'/api/app/login',
        method:'POST'
      }).flush(body)
  })));

  it('should return total price in fakebasket', inject([UserService],(userS:UserService)=>{
    
    let app = new BasketComponent(userS);
    app.items= [
        { product : {id:0,name:"angular",author:"lui",price:30,description:" qqch ..",category:"info",isNew:false,
                    comments:[{rate:1, user:"titi",comment:"no comment"}], rating:3},
          qty: 3
        },
        { product : {id:1,name:"jasmine",author:"toto",price:55,description:" autre chose",category:"info",isNew:true,
                    comments:[{rate:1,user:"me",comment:"good book"},{rate:2,user:"test",comment:"I like it"}]},
          qty: 2
        }
    ];
    expect(app.getTotal()).toBeGreaterThan(150);
    expect(app.getTotal()).toBeLessThanOrEqual(205);
    expect(app.getTotal()).toEqual(200);
    //false
    //expect(app.getTotal()).toBeLessThan(200);
  }));    
});
