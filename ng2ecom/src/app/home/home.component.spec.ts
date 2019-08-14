/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { UserService } from '../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockUserService } from '../test/mocks/user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {News} from '../beans/news';

function createUserServiceSpy() {
  return jasmine.createSpyObj('UserService', ['login']);
}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockUserService: UserService;
  mockUserService = createUserServiceSpy();

  let expectedNews: News[];
  let id_news = 0;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ FormsModule, ReactiveFormsModule ,
                RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      providers: [
        UserService,
        {provide: UserService, useValue: mockUserService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expectedNews = [{
      id: 0,
      author: 'Bruno',
      category: 'Troll',
      content: 'I hate Javascript!',
      likes: 8
    },
    {
      id: 1,
      author: 'Nourredine',
      category: 'Security',
      content: 'I love Security.',
      likes: 11},
    {
      id: 2,
      author: 'Nourredine',
      category: 'True fact',
      content: 'Angular training is awesome!!!!',
      likes: 1200
    }
    ];

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
