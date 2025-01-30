import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, catchError, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { RecipeCuadros } from '../Interface/recipeCuadros';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' //Servicio a nivel raiz, disponibe en toda la aplicacion web
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor(private http: HttpClient, private route: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }


  //Método para obtener datos en forma de Observable.
  getDataObservable<T>(table: string, search?: Object, ids?: string[], idField?: string): Observable<T[]> {
    //Convierte la promesa devuelta en un Observable con el from()
    return from(this.getData(table, search, ids, idField));
  }

  //Metodo para obtener datos de una tabla especifica
  //Se integra en el getDataObservable para que esta lo pueda convertir en observable
  async getData(table: string, search?: Object, ids?: string[], idField?: string): Promise<any[]> {

    let query = this.supabase.from(table).select('*');

    //Si se proporciona parametro se aplica con el metodo match
    if (search) {
      query = query?.match(search);
    }

    //Si se proporciona id se aplica con el metodo in
    if (ids) {
      query = query?.in(idField ? idField : 'id', ids);
    }

    //Ejecuta consulta
    const { data, error } = await query;

    //Si hay error se lanza excepcion
    if (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

    return data;
  }

  //Metodo para obtener cuadros
  getCuadros(search?: string): Observable<RecipeCuadros[]> {
    //Se llama a getdataObservable, se da la opcion de que se puedan poner filtros sinos llama a todos los cuadros
    return this.getDataObservable(
      'cuadros',
      search ? { id: search } : undefined
    );
  }

  //Metodo para registrar un cuadro nuevo en la base de datos
  addCuadro(cuadro: any): Observable<any> {

    return from(
      this.supabase
        .from('cuadros')
        .insert([cuadro]));


  }

  //Metodo para modificar el cuadro
  updateCuadro(id: number, datos: any): Observable<any>{
    return from(this.supabase.from('cuadros')
    .update(datos)
    .match({id}));
  }


  //Metodo para eliminar un cuadro
  deleteCuadro(id: string): Observable<any> {
    return from(this.supabase.from('cuadros').delete().eq('id', id))
    //Busca el ID y lo elimina
  }

  //Metodo de registro de usuarios en supabase
  register(email: string, password: string) {
    const registerResult = from(this.supabase.auth.signUp({
      email,
      password
    }))

    return registerResult;
  }


  //Metodos login para logear, logaut para cerrar sesion y metodo para retornar el cliente
  login(email: string, password: string) {
    const loginResult = from(this.supabase.auth.signInWithPassword({
      email,
      password
    })).pipe(
      map(({ data, error }) => {
        if (error) {
          //Se captura el error y se lanza un mensaje para el error de credenciales
          if (error.message.includes("Invalid login credentials")) {
            throw new Error('Usuario o contraseña incorrectos');
          }
          throw error; //Lanzamos el error genérico si no es autenticacion
        }
        return data;
      }),
      tap(() => this.isLogged())
    );
  
    return loginResult;
  }

  //Metodo para retornar los usuarios
  getUsers(): Observable<any> {
    return from(this.supabase.from('profiles').select('*'));
  }

  loggedSubject = new BehaviorSubject(false);

  //Metodo esta logeado
  async isLogged() {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser();

      if (error) {
        this.loggedSubject.next(false);
        return;
      }

      if (user) {
        this.loggedSubject.next(true);
        await this.handleUserRole(user.id); // Manejo del rol del usuario
      } else {
        this.loggedSubject.next(false);
      }
    } catch (e) {
      console.error('Unexpected error in isLogged:', e);
      this.loggedSubject.next(false);
    }
  }

  loggedRol = new BehaviorSubject(false);

  //Metodo que pide toda la informaciond de profiles y compara la tabla
  //de rol para comprovar si el rol es true o false
  async handleUserRole(userID: string) {
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .select('rol_user')
        .eq('id', userID)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }

      if (data?.rol_user === true) {
        // Es administrador
        this.loggedRol.next(true);
        this.route.navigate(['inicioAdmin']);
      } else if (data?.rol_user === false) {
        // Es usuario común
        this.loggedRol.next(false);
        this.route.navigate(['inicio']);
      } else {
        console.warn('Rol del usuario no definido correctamente');
      }
    } catch (e) {
      console.error('Unexpected error in handleUserRole:', e);
    }
  }


  //Metodo para cerrar sesion
  logout() {
    this.supabase.auth.signOut().then(() => {
      this.loggedSubject.next(false);
      this.loggedRol.next(false);
      this.route.navigate(['/inicio']); // Redirige al login tras cerrar sesión
    });
  }

  //Metodo para informacion del usuario
  getUserInfo(): Observable<User> {
    return from(this.supabase.auth.getUser()).pipe(
      map(({ data }) => data.user as User)
      
    )
  }

  cuadrosAleatorios: any[] = [];
  //Metodo que obtiene todos los cuadros y saca tres aleatoriamente
  cuadrosRandom(): Observable<RecipeCuadros[]> {
    return this.getCuadros().pipe(
      map(cuadros => cuadros.sort(() => Math.random() - 0.5).slice(0, 3)),
      catchError(error => {
        console.log(error);
        return of([]);
      })
    )

  }


}


