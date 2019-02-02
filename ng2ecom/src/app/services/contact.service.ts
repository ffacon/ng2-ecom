import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  email = 'ecommerce@worldline.com';
  phone = '+33 XXXXXXXXX';
  address = 'Rue de la pointe, 59113 Seclin';

  constructor() { }
}
