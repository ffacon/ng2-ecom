import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public email = 'ecom@worldline.com';
  phone = '+33 xxxxxxxx';
  address = 'rue de la pointe Seclin';
  messageSend = false;
  message = '';

  constructor() { }

  updateTextContent(data: any) {
    this.message = data.target.value;
    console.log(this.message);
  }

  sendMessage() {
    console.log('message send: ' + this.message);
    this.messageSend = true;
  }


  ngOnInit() {
  }

}
