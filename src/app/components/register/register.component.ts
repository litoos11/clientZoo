import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/user';
// import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService]
})

export class RegisterComponent implements OnInit{
  public title: string;
  public user: User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Registo';
    this.user = new User('','','','','','ROLE_USER','');
    // ROLE debe de pasarlo desde el form html
  }

  ngOnInit(){
    console.log('Register.component cargado...');
    // console.log(this._userService.register())
  }

  onSubmit(registerForm){
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response)
        if (response.userStored && response.userStored._id){
          this.status = 'success';
          this.user = new User('','','','','','ROLE_USER','');
          registerForm.reset();
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
