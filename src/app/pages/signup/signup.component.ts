import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formSignup: FormGroup;

  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.formSignup = this.fb.group({
      name: ['', Validators.required],
      paternalSurname: ['', Validators.required],
      maternalSurname: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['PATIENT', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  signup() {
    if (this.formSignup.invalid) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    this.auth.signup(this.formSignup.value).subscribe({
      next: (response) => {
        if (response.code === 0) {
          alert('Registro exitoso. Ahora puedes iniciar sesión');
          this.router.navigate(['/login']);
        } else {
          alert('Error: ' + response.message);
        }
      },
      error: (error) => {
        console.error('Error en registro:', error);
        alert('Error al registrar usuario');
      }
    });
  }
}