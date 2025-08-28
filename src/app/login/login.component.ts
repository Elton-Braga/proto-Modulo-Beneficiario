import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './servico de autenticacao/auth-service.service';
import { SessionService } from './servico de autenticacao/session.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [provideNgxMask()],
})
export class LoginComponent {
  registrationForm: FormGroup;
  erroAutenticacao = '';

  // mock de usuários
  private mockUsuarios = [
    { cpf: '11111111111', senha: '123456', perfil: 'admin' },
    { cpf: '22222222222', senha: 'senha123', perfil: 'colaborador' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService
  ) {
    this.registrationForm = this.fb.group({
      cpf: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.sessionService.iniciarMonitoramento();
  }

  onSubmit() {
    const { cpf, senha } = this.registrationForm.value;

    if (this.authService.login(cpf, senha)) {
      this.router.navigate(['/selecaodeservicos']);
    } else {
      alert('Usuário ou senha inválidos');
    }
  }
}
