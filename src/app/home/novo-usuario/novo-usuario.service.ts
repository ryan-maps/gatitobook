import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NovoUsuario } from './novo-usuario';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {
    url = 'http://localhost:3000/user'
    
    constructor(private httpClient: HttpClient) { }

    cadastraNovoUsuario(novoUsuario: NovoUsuario){
      return this.httpClient.post(`${this.url}/signup`, novoUsuario);
    }
    verificaUsuarioExistente(nomeUsuario: string): Observable<any>{
      return this.httpClient.get(`${this.url}/exists/${nomeUsuario}`)
    }
}
