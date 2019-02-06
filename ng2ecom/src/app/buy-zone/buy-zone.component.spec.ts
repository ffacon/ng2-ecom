import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyZoneComponent } from './buy-zone.component';

describe('BuyZoneComponent', () => {
  let component: BuyZoneComponent;
  let fixture: ComponentFixture<BuyZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyZoneComponent ]
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
