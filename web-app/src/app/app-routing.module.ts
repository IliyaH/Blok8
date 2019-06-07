import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CenovnikComponent } from 'src/app/cenovnik/cenovnik.component';
import { KupovinaKarteComponent } from './kupovina-karte/kupovina-karte.component';
import { IzmenaProfilaComponent } from './izmena-profila/izmena-profila.component';

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
{ 
  path: 'kupovinaKarte', 
  component: KupovinaKarteComponent 
},
{ 
  path: 'izmenaProfila', 
  component: IzmenaProfilaComponent 
},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
