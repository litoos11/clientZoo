import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers: [AnimalService]
})
export class ListComponent implements OnInit{
  public title: string ;
  public animals: Animal[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService
  ){
  this.title = 'Listado de animales';
  }

  ngOnInit(){
    this._animalService.getAnimals().subscribe(
      response => {
        if(!response.animals){
          // this._router
        }else{
          this.animals = response.animals;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
