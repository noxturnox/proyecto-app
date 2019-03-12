import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Usuarios } from '../_models';
import { UserService } from '../_services';


@Component({templateUrl: 'admin.component.html', selector: 'app-admin',
styleUrls: ['./admin.component.css'],})
export class AdminComponent implements OnInit {
    currentUser: Usuarios;
    users: Usuarios[] = [];
    numero: number;
    name: string;
    apellido: string;
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.cargarTodosUsuarios();
    }

    borrarUsuario(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.cargarTodosUsuarios() 
        });
    }

    private cargarTodosUsuarios() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    setUsuario(id: number, nombre: string, ape: string){
        this.numero = id;
        this.name = nombre;
        this.apellido = ape;
    }

    cancelarBorrar(){
        this.numero = null;
        this.name = null;
        this.apellido = null;
    }

    

}