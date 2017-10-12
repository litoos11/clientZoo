import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { AnimalService } from '../../../services/animal.service';
import { UploadService } from '../../../services/upload.service';
import { Animal } from '../../../models/animal';

import { fadeLateral } from '../../animation';

@Component({
  selector: 'admin-add',
  templateUrl: './add.component.html',
  providers: [UserService, AnimalService, UploadService],
  animations: [fadeLateral]
})
export class AddComponent implements OnInit{
  public title: string;
  public animal: Animal;
  public identity;
  public token;
  public url: string;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _animalService: AnimalService,
    private _uploadService: UploadService
  ){
    this.title = 'Agregar';
    this.animal = new Animal('','','',0,'','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

  }

  ngOnInit(){
    console.log('El animal add.component se ha cargado...')
  }

  onSubmit(){
    // console.log(this.animal)

    this._animalService.addAnimal(this.token, this.animal).subscribe(
      response => {
        if(!response.animal){
          this.status = 'error';
        }else{
          this.status = "success";
          this.animal = response.animal;

          //Subir la imagen del animal
          if(!this.filesToUpload){
            this._router.navigate(['/admin-panel/listado']);
          }else{
            this._uploadService.makeFileRequest(`${this.url}upload-image-animal/${this.animal._id}`, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.animal.image = result.image;
              // console.log(this.animal);
              this._router.navigate(['/admin-panel/listado']);
            })
          }
        }

      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    // console.log(this.filesToUpload);
  }



}
