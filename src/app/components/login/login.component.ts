import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]

})

export class LoginComponent implements OnInit{
  public title: string;
  public user: User;
  public identity;
  public token;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Login';
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    console.log('Login.component cargado...');
    // console.log(this._userService.getIdentity());
    // console.log(this._userService.getToken());
  }

  onSubmit(){
    //Conseguir el usuario
    this._userService.signup(this.user).subscribe(
      response => {
        // console.log(response)
        this.identity = response.user;

        if(!this.identity || !this.identity._id){
          console.log('NO se ha podido iniciar session');
          this.status = 'error';
        }else{
          this.identity.password = '';
          localStorage.setItem('identity', JSON.stringify(this.identity));
              //Conseguir el tokken
             this._userService.signup(this.user, 'true').subscribe(
              response => {
                // console.log(response)
                this.token = response.token;

                if(this.token.length <= 0){
                  console.log('No se ha generado el token');
                }else{
                  localStorage.setItem('token', this.token);
                  this.status = 'success';

                  this._router.navigate(['/']);
                }
              },
              error => {
                console.log(<any>error);
              }
            )

        }
      },
      error => {
        console.log(<any>error)
        let errorMessage = <any>error;
        if(errorMessage != null){
          let body = JSON.parse(error._body);
          this.status = 'error';
        }
      }
    )
  }
}
