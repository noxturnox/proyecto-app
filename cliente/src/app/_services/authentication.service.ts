import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from '../_models';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Usuarios>;
    public currentUser: Observable<Usuarios>;

    constructor(private http: HttpClient) { 
        this.currentUserSubject = new BehaviorSubject<Usuarios>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Usuarios {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // logueo completado si hay un token jwt en la respuesta
                if (user && user.token) {
                    // se guarda los detalles del usuario y el token jwt en el almacenamiento local para mantener logueado entre los refrescos de pagina
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // se quita al usuario del almacenamiento local al desloguearse
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}