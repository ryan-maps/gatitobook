import { Injectable } from '@angular/core';
import { NovoUsuarioService } from './novo-usuario.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, first, map, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {
  constructor(private novoUsuarioService: NovoUsuarioService) { }
  usuarioJaExiste(){
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges.pipe(
        switchMap(
          nomeUsuario => this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
        ),
        map(usuarioExistente => ({ usuarioExistente })),
        tap(console.log),
        // take(1),
        map(firstResult => { 
          console.log("First Result: ", firstResult);
          return firstResult;
        }),
        first()
      )
    }
  }
}
