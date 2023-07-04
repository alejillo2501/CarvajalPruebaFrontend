import { Component, OnInit } from '@angular/core';
import { ILoginResponse, Login } from '../shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../core/data.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = {} as FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  login: Login = {
    username: '',
    password: ''
  };

  errorMessage:String = "";

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {    
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username:  [this.login.username, Validators.required],
      password:   [this.login.password, Validators.required]
    });
  }

  recuperar(){
    console.log("CLICK RECUPERAR")
    //this.router.navigate(['/recuperar']);
  }

  registro(){    
    this.router.navigate(['/registro']);
  }

  submit({ value, valid }: { value: Login, valid: boolean }) {

      console.log("VALORES: ", value);

      this.dataService.loginUser(value)
        .subscribe((login: ILoginResponse) => {
          if (login) {
            console.log("TOKEN: ", localStorage.getItem('token'));            
            this.router.navigate(['/inicio']);
          }
          else {
            this.errorMessage = 'Usuario o contraseña incorrectos';
          }
        },
        (err: any) => {
          this.errorMessage = 'Usuario o contraseña incorrectos';
          console.log(err);
        })
        
    
}

}
