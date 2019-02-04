import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

function containsValidCharacters(c: FormControl) {

const specialChars = ['\\', '<', '>', '&' ];

for (let i in specialChars) {
if ( c.value !== undefined && c.value.indexOf(specialChars[i]) !== -1 ) {
    return {'containsValidCharacters': true };
 }
}
 return null;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public email: string ;
  phone: string;
  address: string;
  messageSend = false;
  message: string;

  controlGroup: FormGroup;
  public messageCtrl: FormControl;

  constructor(contactService: ContactService, fb: FormBuilder) {
    this.email = contactService.email ;
    this.phone = contactService.phone ;
    this.address = contactService.address;

    this.messageCtrl = fb.control('', [Validators.required, containsValidCharacters]);
    this.controlGroup = fb.group({
     'messageCtrl': this.messageCtrl
  });

}

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
