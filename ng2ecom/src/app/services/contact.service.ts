import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  email: string= 'ecommerce@worldline-sdco.com';
  phone: string= "+33 XXXXXXXXX";
  address: string= "Rue de la pointe, 59113 Seclin";

  constructor() { }
}
