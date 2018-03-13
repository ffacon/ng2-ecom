import { Injectable, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';

@Injectable()
export class ContactService {

  public email: string= "ecom@worldline.com";
  public phone: string= "+33 xxxxxxxx";
  public address: string= "seclin";  
  constructor() { }

}
