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

  constructor(public router: Router, private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
  }


  login(){
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
      res => {
        if(res)
        {
  
          let jwt = res.access_token;
          let jwtData = jwt.split('.')[1]
          let decodedJwtJasonData = window.atob(jwtData)
          let decodetJwtData = JSON.parse(decodedJwtJasonData)
  
          let role = decodetJwtData.role
  
          let a = decodetJwtData.unique_name
          localStorage.setItem('jwt', jwt)
          localStorage.setItem('role', role)
          localStorage.setItem('name',a);
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
