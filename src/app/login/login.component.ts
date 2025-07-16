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
import { RouterModule } from '@angular/router';

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
  cpf: any = '';
  senha: any = '';
  mockUsuarios = [
    { cpf: '111.111.111-11', senha: '123456' },
    { cpf: '222.222.222-22', senha: 'senha123' },
    { cpf: '333.333.333-33', senha: 'abc123' },
    { cpf: '444.444.444-44', senha: 'qwerty' },
    { cpf: '555.555.555-55', senha: 'admin' },
    { cpf: '666.666.666-66', senha: 'root123' },
    { cpf: '777.777.777-77', senha: 'senha777' },
    { cpf: '888.888.888-88', senha: 'pass888' },
    { cpf: '999.999.999-99', senha: 'senha999' },
    { cpf: '000.000.000-00', senha: 'zerozero' },
  ];
  erroAutenticacao = '';

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}
  //Garante que o campo não seja nulo, se foi tocado ou se houve alguma outra ação
  get cpfTouched(): AbstractControl {
    return this.registrationForm.get('cpf')!;
  }

  get senhaTouched(): AbstractControl {
    return this.registrationForm.get('senha')!;
  }
  onSubmit(): void {
    this.cpf.value;
    const senha = this.senha.value;

    //ealiza a busca de um usuário com CPF correspondente na lista de usuários fictícios (mockUsuarios)
    const usuario = this.mockUsuarios.find((u) => u.cpf === this.cpf.value);

    if (!usuario) {
      this.erroAutenticacao = 'CPF não encontrado.';
    } else if (usuario.senha !== this.senha.value) {
      console.log((this.erroAutenticacao = 'Senha incorreta.'));
    } else {
      this.erroAutenticacao = '';
      console.log('Login realizado com sucesso!');
    }

    console.log(this.registrationForm.value);
  }
}
