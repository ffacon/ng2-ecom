import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public email = 'ecom@worldline.com';
  phone = '+33 xxxxxxxx';
  address = 'rue de la pointe Seclin';
  constructor() { }
}
