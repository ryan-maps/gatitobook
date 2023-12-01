import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/autenticacao/usuario/usuario';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

  constructor(private usuarioService: UsuarioService, private router: Router) { }
  
  user$: Observable<Usuario> = this.usuarioService.retornaUsuario();

  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl('');
  }
}
