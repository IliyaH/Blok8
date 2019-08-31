import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { MenageStationsComponent } from './components/menage-stations/menage-stations.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LinesComponent } from './components/lines/lines.component';
import { ManagePricelistComponent } from './components/manage-pricelist/manage-pricelist.component';
import { ManageScheduleComponent } from './components/manage-schedule/manage-schedule.component';
import { ValidateUsersComponent } from './components/validate-users/validate-users.component';
import { ValidateTicketsComponent } from './components/validate-tickets/validate-tickets.component';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    PricelistComponent,
    BuyTicketComponent,
    ProfileComponent,
    MenageStationsComponent,
    ScheduleComponent,
    LinesComponent,
    ManagePricelistComponent,
    ManageScheduleComponent,
    ValidateUsersComponent,
    ValidateTicketsComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgxPayPalModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
