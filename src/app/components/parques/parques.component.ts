import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'parques',
  templateUrl: 'parques.component.html'
})

export class ParquesComponent implements OnChanges, OnInit, OnDestroy {
  @Input() nombre: string;
  @Input('medida') metros: number;
  public vegetacion: string;
  public abierto: boolean;

  @Output() pasarLosDatos = new EventEmitter();


  constructor(){
    this.nombre = 'Parque natural para caballos';
    this.metros = 450;
    this.vegetacion = 'Alta';
    this.abierto = false;
  }

  ngOnChanges(changes: SimpleChanges){
    // console.log(changes);
    // console.log("Cambiaron las propiedades");
  }

  ngOnInit(){
    // console.log("OnInit Lanzado...")
  }

  // ngDoCheck(){
  //   console.log("El DoCheck se ha lanzado...")
  // }

  ngOnDestroy(){
    // console.log("OnDestroy va eliminar el componente...")
  }

  emitirEvento(){
    this.pasarLosDatos.emit({
      'nombre': this.nombre,
      'metros': this.metros,
      'vegetacion': this.vegetacion,
      'abierto': this.abierto
    });
  }

}
