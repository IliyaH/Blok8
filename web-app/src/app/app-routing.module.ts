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
import { ManageScheduleComponent } from './components/manage-schedule/manage-schedule.component';
import { ValidateUsersComponent } from './components/validate-users/validate-users.component';
import { ValidateTicketsComponent } from './components/validate-tickets/validate-tickets.component';
import { BusLinesComponent } from './components/bus-lines/bus-lines.component';
import { AdminGuardGuard } from './components/guards/admin-guard.guard';
import { ControllerGuard } from './components/guards/controller.guard';
import { UserGuard } from './components/guards/user.guard';
import { NorRegisteredUserGuard } from './components/guards/nor-registered-user.guard';
import { ProfileGuard } from './components/guards/profile.guard';
import { BusLocationComponent } from './components/bus-location/bus-location.component';

const routes: Routes = [{
  path: '', 
  redirectTo: 'nav-bar', 
  pathMatch: 'full' 
},
{ 
  path: 'login', 
  component: LoginComponent, 
  canActivate: [NorRegisteredUserGuard]
},
{ 
  path: 'register', 
  component: RegisterComponent,
  canActivate: [NorRegisteredUserGuard] 
},
{ 
  path: 'pricelist', 
  component: PricelistComponent,
  canActivate: [UserGuard] 
},
{ 
  path: 'buy-ticket', 
  component: BuyTicketComponent,
  canActivate: [UserGuard] 
},
{ 
  path: 'profile', 
  component: ProfileComponent,
  canActivate: [ProfileGuard]  
},
{ 
  path: 'menage-stations', 
  component: MenageStationsComponent,  
  canActivate: [AdminGuardGuard]
},
{ 
  path: 'schedule', 
  component: ScheduleComponent,
  canActivate: [UserGuard]  
},
{ 
  path: 'lines', 
  component: LinesComponent,
  canActivate: [AdminGuardGuard]  
},
{ 
  path: 'manage-pricelist', 
  component: ManagePricelistComponent,
  canActivate: [AdminGuardGuard]  
},
{ 
  path: 'manage-schedule', 
  component: ManageScheduleComponent,
  canActivate: [AdminGuardGuard]  
},
{ 
  path: 'validate-users', 
  component: ValidateUsersComponent,
  canActivate: [ControllerGuard]  
},
{ 
  path: 'validate-tickets', 
  component: ValidateTicketsComponent,
  canActivate: [ControllerGuard]  
},
{ 
  path: 'bus-lines', 
  component: BusLinesComponent,
  canActivate: [UserGuard]  
},
{ 
  path: 'bus-location', 
  component: BusLocationComponent,
  canActivate: [UserGuard]  
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
