import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { UsuarioExisteService } from './usuario-existe.service';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder, 
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExistenteService: UsuarioExisteService,
    private router: Router
  ) { }

  passwordValidation(): ValidatorFn
  {
    console.log("Password Validation");
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const invalidStartWith = !password.startsWith('A');
      return {
        invalidStartWith
      };
    }
  }

  ngOnInit(): void 
  {
    this.novoUsuarioForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: [''],
        password: ['', [Validators.required, Validators.minLength(8)]],
        userName: ['', [minusculoValidator], [this.usuarioExistenteService.usuarioJaExiste()]],
      },
      {
        validators: [usuarioSenhaIguaisValidator]
      }
    )
  }

  cadastrar()
  {
    if(this.novoUsuarioForm.valid){
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(
        () => {
          this.router.navigateByUrl('');
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
  
}
