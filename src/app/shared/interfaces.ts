export interface Login {
    username: String;
    password: String;
}

export interface ILoginResponse {
    id: string;
    username: string;
    fullName: string;
    token: string;    
}

export interface Registro {
    username: String;
    fullName: String;
    password: String;
    rePassword: String;
    authorities: any;
}

export interface User {
    id:String;
    username:String;
    fullName:String;
}

export interface Publicacion {
    title: String;
    about: String;
    authorId: any;
    autor: any;
    publishDate: String;
}

export interface IPublicacionResponse extends Publicacion {
    id: String;
    createdAt: String;
}

export interface Comentario {
    comentario: String;
    publicacionId: String;
    userId: any;
    user: any;
    publishDate: String;    
    createdAt: String;
}

export interface IComentarioResponse extends Comentario {
    id: String;
}

export interface Page {
    number: number;
    limit: number;
}

export interface queryRequest {
    page:Page;
    query:any;
}