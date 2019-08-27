import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { MenageStationsComponent } from './components/menage-stations/menage-stations.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import {LinesComponent} from './components/lines/lines.component';
import {ManagePricelistComponent} from './components/manage-pricelist/manage-pricelist.component';

const routes: Routes = [{
  path: '', 
  redirectTo: 'nav-bar', 
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
  path: 'pricelist', 
  component: PricelistComponent 
},
{ 
  path: 'buy-ticket', 
  component: BuyTicketComponent 
},
{ 
  path: 'profile', 
  component: ProfileComponent  
},
{ 
  path: 'menage-stations', 
  component: MenageStationsComponent  
},
{ 
  path: 'schedule', 
  component: ScheduleComponent  
},
{ 
  path: 'lines', 
  component: LinesComponent  
},
{ 
  path: 'manage-pricelist', 
  component: ManagePricelistComponent  
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
