import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';  
import { DoctorsComponent } from './pages/doctors/doctors.component'; 
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ReservaCitasComponent } from './pages/reserva-citas/reserva-citas.component';

const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'doctors', component: DoctorsComponent }  
      { path: 'reserva-citas', component: ReservaCitasComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
