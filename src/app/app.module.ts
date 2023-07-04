import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule }   from './core/core.module';
import { SharedModule }   from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  imports: [
    BrowserModule, 
    AppRoutingModule,
    CoreModule,   //Singleton objects
    SharedModule  //Shared (multi-instance) objects
  ],
  declarations: [ AppComponent, AppRoutingModule.components, HomeComponent, LoginComponent, ComentariosComponent, RegistroComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }