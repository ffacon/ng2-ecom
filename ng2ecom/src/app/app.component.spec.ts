import { TestBed, async, getTestBed, inject, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

import { LocalStorageService } from './services/local-Storage.service';
import { UserService } from './services/user.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  let userService: UserService;
  let localStorageService: LocalStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, HttpClientModule],
       providers: [

          {provide: UserService, useClass: UserService},
          {provide: LocalStorageService, useClass: LocalStorageService}
        ]
    });
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
    });

    userService = TestBed.get(UserService);
    localStorageService = TestBed.get(LocalStorageService);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('can instantiate the component', () => {
    expect(comp).not.toBeNull();
  });

});
