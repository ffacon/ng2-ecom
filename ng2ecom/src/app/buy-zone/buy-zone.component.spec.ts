import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyZoneComponent } from './buy-zone.component';
import { UserService } from '../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('BuyZoneComponent', () => {
  let component: BuyZoneComponent;
  let fixture: ComponentFixture<BuyZoneComponent>;

  function createRouterSpy() {
    return jasmine.createSpyObj('Router', ['navigate']);
  }
  function createUserServiceSpy() {
    return jasmine.createSpyObj('UserService', ['login', 'getBasket']);
  }

  const mockUserService = createUserServiceSpy();
  const routerSpy = createRouterSpy();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyZoneComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, HttpClientModule ],
      providers: [
        {provide: UserService, useValue: mockUserService},
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
