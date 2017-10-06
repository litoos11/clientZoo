import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
  selector: 'keepers',
  templateUrl: './keepers.component.html',
  animations: [fadeIn]
})
export class KeepersComponent implements OnInit{
  title = 'Cuidadores';

  ngOnInit(){
    console.log("El componente Keepers se ha lanzado...")
  }
}
