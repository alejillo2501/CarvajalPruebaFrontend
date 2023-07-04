import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError,  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Login, ILoginResponse, Registro, User, Publicacion, IPublicacionResponse, queryRequest, IComentarioResponse, Comentario } from '../shared/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    baseUrl = environment.apiUrl;
    baseCustomersUrl = this.baseUrl + 'customers';
    baseStatesUrl = this.baseUrl + 'states';
    baseLoginUrl = this.baseUrl + 'public/';
    basePublicacionUrl = this.baseUrl + 'publicacion';
    baseComentarioUrl = this.baseUrl + 'comentario';

    constructor(private http: HttpClient) { }

    loginUser(login: Login) : Observable<ILoginResponse> {
        
        return this.http.post<ILoginResponse>(this.baseLoginUrl+"login", login)
            .pipe(                   
                map((data:ILoginResponse) => {
                       console.log('Login status: ', data);
                       localStorage.setItem('fullName', data.fullName);
                       localStorage.setItem('idUser', data.id);
                       localStorage.setItem('token', data.token);
                       return data;
                   }),
                catchError(this.handleError)
            );
    }

    registroUser(user: Registro) : Observable<User> {
        
        return this.http.post<ILoginResponse>(this.baseLoginUrl+"register", user)
            .pipe(                   
                map(data => {
                       console.log('Register status: ', data);
                       return data;
                   }),
                catchError(this.handleError)
            );
    }

    createPublicacion(publicacion: Publicacion) : Observable<IPublicacionResponse> {
        
        return this.http.post<IPublicacionResponse>(this.basePublicacionUrl, publicacion, {
            headers: {
                "Authorization": "bearer "+localStorage.getItem('token')
            }
        })
            .pipe(                   
                map(data => {
                       console.log('Publicación status: ', data);
                       return data;
                   }),
                catchError(this.handleError)
            );
    }

    editarPublicacion(publicacion: Publicacion, id:string) : Observable<IPublicacionResponse> {
        
        return this.http.put<IPublicacionResponse>(this.basePublicacionUrl+"/"+id, publicacion, {
            headers: {
                "Authorization": "bearer "+localStorage.getItem('token')
            }
        })
            .pipe(                   
                map(data => {
                       console.log('Publicación status: ', data);
                       return data;
                   }),
                catchError(this.handleError)
            );
    }

    eliminarPublicacion(id:string) : Observable<IPublicacionResponse> {
        
        return this.http.delete<IPublicacionResponse>(this.basePublicacionUrl+"/"+id, {
            headers: {
                "Authorization": "bearer "+localStorage.getItem('token')
            }
        })
            .pipe(                   
                map(data => {
                       console.log('Publicación status: ', data);
                       return data;
                   }),
                catchError(this.handleError)
            );
    }

    allPublicacion(publicaciones: queryRequest) : Observable<IPublicacionResponse[]> {
        
        return this.http.post<IPublicacionResponse[]>(this.basePublicacionUrl+"/search", publicaciones, {
            headers: {
                "Authorization": "bearer "+localStorage.getItem('token')
            }
        })
            .pipe(                   
                map(data => {
                       console.log('Publicaciones status: ', data);
                       return data;
                   }),
                catchError(this.handleError)
            );
    }

    createComentario(comentarios: Comentario) : Observable<IComentarioResponse> {
        
        return this.http.post<IComentarioResponse>(this.baseComentarioUrl, comentarios, {
            headers: {
                "Authorization": "bearer "+localStorage.getItem('token')
            }
        })
            .pipe(                   
                map(data => {
                       console.log('Publicación status: ', data);
                       return data;
                   }),
                catchError(this.handleError)
            );
    }

    editarComentario(comentarios: Comentario, id:string) : Observable<IComentarioResponse> {
        
        return this.http.put<IComentarioResponse>(this.baseComentarioUrl+"/"+id, comentarios, {
            headers: {
                "Authorization": "bearer "+localStorage.getItem('token')
            }
        })
            .pipe(                   
                map(data => {
                       console.log('Publicación status: ', data);
                       return data;
                   }),
                catchError(this.handleError)
            );
    }

    elimnarComentario(id:string) : Observable<IComentarioResponse> {
        
        return this.http.delete<IComentarioResponse>(this.baseComentarioUrl+"/"+id, {
            headers: {
                "Authorization": "bearer "+localStorage.getItem('token')
            }
        })
            .pipe(                   
                map(data => {
                       console.log('Publicación status: ', data);
                       return data;
                   }),
                catchError(this.handleError)
            );
    }

    allComentarios(comentarios: queryRequest) : Observable<IComentarioResponse[]> {
        
        return this.http.post<IComentarioResponse[]>(this.baseComentarioUrl+"/search", comentarios, {
            headers: {
                "Authorization": "bearer "+localStorage.getItem('token')
            }
        })
            .pipe(                   
                map(data => {
                       console.log('Comentarios status: ', data);
                       return data;
                   }),
                catchError(this.handleError)
            );
    }    
    
    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error); 
        if (error.error instanceof Error) {
          let errMessage = error.error.message;
          return throwError(() => new Error(errMessage));
          // Use the following instead if using lite-server
          //return Observable.throw(err.text() || 'backend server error');
        }
        return throwError(() => new Error(error.message || 'Spring Boot server error'));
    }

}
