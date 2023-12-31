import { Router, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { canActivate } from './auth-guard';



//ROUTES
export const routes: Routes = [
    { path: '', component: LoginComponent, title:"Login Page"},
    { path: 'home', component: HomeComponent, title:"Home Page",canActivate: [canActivate]},
    { path: '**', pathMatch: 'full' ,component: PagenotfoundComponent, title:"404 NOT FOUND" },
];


