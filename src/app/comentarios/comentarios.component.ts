import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comentario, queryRequest } from '../shared/interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input('idPublicacion') idPublicacion = '';

  comentarios:any;
  comentarioForm: FormGroup = {} as FormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.comentarioForm.controls;
  }

  comentarioFormEdit: FormGroup = {} as FormGroup;
  get g(): { [key: string]: AbstractControl } {
    return this.comentarioFormEdit.controls;
  }

  comentario: Comentario = {
    createdAt: '',
    comentario: '',
    publicacionId: '',
    userId: '',
    user: '',
    publishDate: ''
  };

  idUser = localStorage.getItem('idUser');
  idComentario = '';
  errorMessage:String = "";

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadComentarios();
    this.buildForm();
  }

  buildForm() {
    this.comentarioForm = this.formBuilder.group({
      comentario: [this.comentario.comentario, Validators.required],
    });
  }

  buildFormEdit(coment:any) {
    this.comentarioFormEdit = this.formBuilder.group({
      comentario: [coment, Validators.required],
    });
  }

  loadComentarios(){

    var query: queryRequest = {
      page: {
        number: 1,
        limit: 100
      },
      query:{
        publicacionId: this.idPublicacion
      }
    }
    this.dataService.allComentarios(query)
        .subscribe((comentarios:any) => {
          if (comentarios) {                      
            this.comentarios = comentarios.items;
            console.log(this.comentarios);
          }          
        },
        (err: any) => {
          console.log(err);
        })
  }

  submit({ value, valid }: { value: Comentario, valid: boolean }){
    
    var data: Comentario = {
      createdAt: moment().format('YYYY-MM-DDTHH:mm:ss'),
      comentario: value.comentario,
      publicacionId: this.idPublicacion,
      userId: localStorage.getItem('idUser'),
      user: localStorage.getItem('fullName'),
      publishDate: moment().format('YYYY-MM-DD')
    }

    if(this.idComentario != ''){
      this.dataService.editarComentario(data, this.idComentario)
        .subscribe((comentarios:any) => {
          if (comentarios) {    
            this.loadComentarios();
            this.idComentario = '';
          }          
        },
        (err: any) => {
          console.log(err);
          this.errorMessage = "No se pudo crear el comentario: "+err
        })
    }else{

      this.dataService.createComentario(data)
        .subscribe((comentarios:any) => {
          if (comentarios) {    
            this.loadComentarios(); 
            this.buildForm();
          }          
        },
        (err: any) => {
          console.log(err);
          this.errorMessage = "No se pudo crear el comentario: "+err
        })

    }
    
  }

  editComentario(item:any){
    console.log("EDITAR COMENTARIO: ", item);
    this.idComentario = item.id;    
    this.buildFormEdit(item.comentario);
  }

  cancelEditComentario(){
    this.idComentario = '';
  }

  eliminarComentario(e:any){
    this.dataService.elimnarComentario(e.id)
        .subscribe((comentario:any) => {
          if (comentario) {    
            this.loadComentarios();            
          }          
        },
        (err: any) => {
          console.log(err);
          this.errorMessage = "No se pudo eliminar la publicacion: "+err
        })
  }

}
