import { TestBed, async, getTestBed, inject, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

import { LocalStorageService } from './services/local-Storage.service';
import { UserService } from './services/user.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

let comp:    AppComponent;
let fixture:ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  let userService :UserService;
  let localStorageService :LocalStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule,HttpClientTestingModule,HttpClientModule],
       providers: [

          {provide: UserService, useClass: UserService},
          {provide: LocalStorageService, useClass: LocalStorageService}
        ]
    });
    TestBed.compileComponents().then(()=>{
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });

    userService=TestBed.get(UserService);
    localStorageService=TestBed.get(LocalStorageService);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('can instantiate the component', () => {
    expect(comp).not.toBeNull();
  });

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('SDCO Book Store');
  }));

  it('should be created', ()=> {
      expect(userService).toBeTruthy();
      expect(localStorageService).toBeTruthy();
  });

  it('should logout',()=>{
    comp.logout();
    expect(comp.logout).toBeDefined();
    expect(comp.logout).toBeTruthy();
    expect(userService.isLogged).toBe(false);
    expect(userService.getUser()).toBeUndefined();
    expect(userService.basket).toBeUndefined();
  });

});
