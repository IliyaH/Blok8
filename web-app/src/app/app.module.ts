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
import { IzmenaProfilaComponent } from './izmena-profila/izmena-profila.component';
import { TokenInterceptor } from 'src/app/token.interceptor';
import { ValuesHttpService } from 'src/app/values-http.service';
import { AuthHttpService } from 'src/app/auth-http.service';

import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CenovnikComponent,
    KupovinaKarteComponent,
    IzmenaProfilaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
      
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    ValuesHttpService, 
    AuthHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
