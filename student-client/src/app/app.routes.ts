import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Students } from './components/students/students';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'students', component: Students },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
