import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../core/data.service';
import { Registro, User } from '../shared/interfaces';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup = {} as FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.registroForm.controls;
  }
  registro: Registro = {
    username: '',
    fullName: '',
    password: '',
    rePassword: '',
    authorities: []
  };

  errorMessage:String = "";
  successMessage:String = "";

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
    this.registroForm = this.formBuilder.group({
      username:  [this.registro.username, Validators.required],
      fullName:   [this.registro.fullName, Validators.required],
      password:   [this.registro.password, Validators.required],
      rePassword:   [this.registro.rePassword, Validators.required],
    });
  }

  submit({ value, valid }: { value: Registro, valid: boolean }) {

    console.log("VALORES: ", value);
    value.authorities = ["USER_ADMIN"];

    this.dataService.registroUser(value)
      .subscribe((registro: User) => {
        if (registro) {           
          this.successMessage = "Registro creado con éxito";
          this.errorMessage = "";
          this.buildForm();
        }
        else {
          this.errorMessage = 'No se pudo registrar el usuario';
        }
      },
      (err: any) => {
        this.errorMessage = 'No se pudo registrar el usuario';
        console.log(err);
      })
      
  
  }

  cancelRegistro(){
    this.router.navigate(['/']);
  }

}
