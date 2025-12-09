import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ingresar() {
    const { usuario, password } = this.formLogin.value;

    if (this.auth.login(usuario, password)) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
