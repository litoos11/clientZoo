import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  animations: [fadeIn]
})
export class ContactComponent implements OnInit{
  title = 'Contacto';
  emailContacto: string;

  ngOnInit(){
    console.log("El componente Contact se ha lanzado...")
  }

  guardarEmail(){
    localStorage.setItem('emailContacto', this.emailContacto);
  }
}
