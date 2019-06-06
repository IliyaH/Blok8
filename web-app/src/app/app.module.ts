import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CenovnikComponent } from './cenovnik/cenovnik.component';

import {HttpClientModule} from '@angular/common/http';
import { KupovinaKarteComponent } from './kupovina-karte/kupovina-karte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CenovnikComponent,
    KupovinaKarteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
