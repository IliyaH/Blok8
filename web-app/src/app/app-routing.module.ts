import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CenovnikComponent } from 'src/app/cenovnik/cenovnik.component';

const routes: Routes = [{ 
  path: '', 
  redirectTo: 'navbar', 
  pathMatch: 'full' 
},
{ 
  path: 'login', 
  component: LoginComponent 
},
{ 
  path: 'register', 
  component: RegisterComponent 
},
{ 
  path: 'cenovnik', 
  component: CenovnikComponent 
},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
