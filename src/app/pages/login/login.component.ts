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
      dni: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    // No debe lanzar error
  }

  login() {
    const { dni, password } = this.formLogin.value;

    if (this.auth.login(dni, password)) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
