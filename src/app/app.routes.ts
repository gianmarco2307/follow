import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageComponent } from './pages/manage/manage.component';
import { authGuard } from './guardie/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'manage', component: ManageComponent, canActivate: [authGuard]}
];
