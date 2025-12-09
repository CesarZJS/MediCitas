import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent }
    ]
  },
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
