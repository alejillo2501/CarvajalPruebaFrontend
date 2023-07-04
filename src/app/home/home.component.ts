import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../core/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPublicacionResponse, Publicacion, queryRequest } from '../shared/interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  publicaciones:any;
  viewComentario:String = "";
  authorId = localStorage.getItem('idUser');
  author = localStorage.getItem('fullName');

  editView = false;
  idPublicacion:any = '';

  publicacionForm: FormGroup = {} as FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.publicacionForm.controls;
  }
  publicacion: Publicacion = {
    title: '',
    about:'',
    authorId:'',
    autor:'',
    publishDate: ''
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
    this.loadPublicaciones();
    this.buildForm();
  }

  buildForm() {
    this.publicacionForm = this.formBuilder.group({
      title: [this.publicacion.title, Validators.required],
      about: [this.publicacion.about, Validators.required]
    });
  }

  loadPublicaciones(){

    var query: queryRequest = {
      page: {
        number: 1,
        limit: 100
      },
      query:{

      }
    }
    this.dataService.allPublicacion(query)
        .subscribe((publicaciones:any) => {
          if (publicaciones) {                      
            this.publicaciones = publicaciones.items;
            console.log(this.publicaciones);
          }          
        },
        (err: any) => {
          console.log(err);
        })
  }

  mostrarComentarios(id:String){
    if(this.viewComentario == id){
      this.viewComentario = '';
    }else{
      this.viewComentario = id;
    }    
  }

  submit({ value, valid }: { value: Publicacion, valid: boolean }){
    
    var data: Publicacion = {
      title: value.title,
      about: value.about,
      authorId: localStorage.getItem('idUser'),
      autor: localStorage.getItem('fullName'),
      publishDate: moment().format('YYYY-MM-DD')
    }
    if(this.editView){

      this.dataService.editarPublicacion(data, this.idPublicacion)
        .subscribe((publicacion:any) => {
          if (publicacion) {    
            this.loadPublicaciones(); 
            this.cancelEdit();
            this.successMessage = "Publicación editada con éxito";
            setTimeout(() => {
              this.successMessage = "";
            }, 5000);
          }          
        },
        (err: any) => {
          console.log(err);
          this.errorMessage = "No se pudo crear la publicacion: "+err
        })
      
    }else{
      this.dataService.createPublicacion(data)
        .subscribe((publicacion:any) => {
          if (publicacion) {    
            this.loadPublicaciones(); 
            this.buildForm();
            this.successMessage = "Publicación creada con éxito";
            setTimeout(() => {
              this.successMessage = "";
            }, 5000);
          }          
        },
        (err: any) => {
          console.log(err);
          this.errorMessage = "No se pudo crear la publicacion: "+err
        })

    }
    
  }

  editPublicacion(e:IPublicacionResponse){
    this.publicacion.title = e.title;
    this.publicacion.about = e.about;
    this.buildForm();
    this.idPublicacion = e.id;
    this.editView = true;
  }

  cancelEdit(){    
    this.publicacion.title = '';
    this.publicacion.about = '';
    this.idPublicacion = '';
    this.buildForm();
    this.editView = false;
  }

  eliminarPublicacion(e:any){
    this.dataService.eliminarPublicacion(e.id)
        .subscribe((publicacion:any) => {
          if (publicacion) {    
            this.loadPublicaciones();
            this.successMessage = "Publicación eliminada con éxito";
            setTimeout(() => {
              this.successMessage = "";
            }, 5000);
          }          
        },
        (err: any) => {
          console.log(err);
          this.errorMessage = "No se pudo eliminar la publicacion: "+err
        })
  }

  salir(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
