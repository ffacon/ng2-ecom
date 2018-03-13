import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  
  messageSend: boolean=false;
  message="";
  email: string;
  phone: string; 
  address: string;

  constructor(contactService :ContactService) {
    this.email = contactService.email;
    this.phone = contactService.phone;
    this.address = contactService.address;
   }
  
  updateTextContent  = (data:any) =>{
    this.message = data.target.value;
    console.log(this.message);
  }

  sendMessage = () => {
    console.log("message send: " + this.message);
    this.messageSend =true;
  }

  ngOnInit() {

  }

}
