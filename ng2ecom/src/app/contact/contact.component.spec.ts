/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {FormsModule, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

import { ContactComponent } from './contact.component';
import { ContactService } from '../services/contact.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let contactService: ContactService;
  let fixture: ComponentFixture<ContactComponent>;
  let ContactServiceStub;
  let de:      DebugElement;
  let el:      HTMLElement;
  let expectMatch: RegExp;

  beforeEach(async(() => {
    ContactServiceStub = {
      email: 'ecommerce@worldline-sdco.com',
      phone:  '+33 XXXXXXXXX',
      address: 'Paris',
    };

    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ FormsModule, ReactiveFormsModule,HttpClientModule, HttpClientTestingModule ],
      providers: [{provide: ContactService, useValue: ContactServiceStub},  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // contactervice from the root injector
    contactService = TestBed.get(ContactService);
      
    //  get the "k-info-block" element by CSS selector (e.g., by class name)
    de = fixture.debugElement.query(By.css('.k-info-block'));
    el = de.nativeElement;
  });

  afterEach(()=>{
    expectMatch=null;
    contactService=null;
    component=null;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(contactService).toBeTruthy();
  });

  it('should contain Contact Us & Seclin & ...', () => {
    const content = el.textContent;
    expect(content).toContain('Contact Us');
    expect(content).toContain('Send us a message');
  });

  it('sould messageSend to be false & message to be string  ',() => {
    expect(component.messageSend).toBeFalsy();
    expect(component.message).toString();
   
  });
  // test special chars in mail
  it('should not contain the special characters',() =>{

      expectMatch=new RegExp(/\\|>|<|&/,'i');
      expect(component.message).not.toMatch(expectMatch);
      expect(component.message).not.toMatch(/\\/);
      expect(component.message).not.toMatch(/>/);
      expect(component.message).not.toMatch(/</);
      expect(component.message).not.toMatch(/&/);      
  });

});


