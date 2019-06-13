import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  emailOrPassError: boolean = false;

  /*email 	= require("./path/to/emailjs/email");
  server 	= this.email.server.connect({
    user:    "username", 
    password:"password", 
    host:    "smtp.your-email.com", 
    ssl:     true
 });*/

  constructor(public router: Router, private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
    let ilija = localStorage['role'];
    console.log(ilija);
  }

  /*sendEmail(){
    this.server.send({
      text:    "i hope this works", 
      from:    "zilic.nemanja@gmail.com", 
      to:      "zilic.nemanja@gmail.com",
      subject: "testing emailjs"
   });
  }*/

  login(){
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
      res => {
        if(res)
        {
          console.log('Ja pisisujem: ' + res)
          console.log(res.access_token);
  
          let jwt = res.access_token;
          let jwtData = jwt.split('.')[1]
          let decodedJwtJasonData = window.atob(jwtData)
          let decodetJwtData = JSON.parse(decodedJwtJasonData)
  
          let role = decodetJwtData.role
          //let temp = decodetJwtData.email
          
          console.log('jwtData: ' + jwtData)
          console.log('decodedJwtJsonData: ' + decodedJwtJasonData)
          console.log(decodetJwtData)
          console.log('Role: ' + role)
          //console.log('Password' + temp)
  
          let a = decodetJwtData.unique_name
          localStorage.setItem('jwt', jwt)
          localStorage.setItem('role', role)
          localStorage.setItem('name',a);
          //localStorage.setItem('password', temp);
          window.location.href = "/profile"
        }
        else
        {
          this.emailOrPassError = true;
        }
      }
    );
  }

}
