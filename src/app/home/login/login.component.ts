import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = ''
  senha = ''
  constructor(private authService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
  }
  login(){
    this.authService.autenticar(this.usuario, this.senha).subscribe(
        () => {
          console.log("AUTENTICADO")
          this.limpaCampos();
          this.router.navigateByUrl('animais')
        },
        (error) => {
          alert("Usuário ou senha inválida")
          console.error(error);
          this.limpaCampos();
        }
      )
  }
  limpaCampos(){
    this.usuario = ''
    this.senha = ''
  }
}
