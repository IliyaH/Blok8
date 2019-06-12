import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectValue: any;

  registerForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    address: ['', Validators.required],
    birthday: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    userType: ['', Validators.required],
    image: [''],
  }, {validator: this.checkPassword});

  temp: any;

  constructor(public router: Router, private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSelect(event : any)
  {
    this.selectValue = event.target.value;
  }

  checkPassword(group: FormGroup)
  {
      let pass = group.controls.password.value;
      let confirmPass = group.controls.confirmPassword.value;

      return pass == confirmPass ? null : {notSame: true}
  }

  register(){
    this.authService.register(this.registerForm.value).subscribe();
    window.alert('Successfully registered!');
    window.location.href = "/login"
  }
  
  login(){
    this.authService.login(this.registerForm.controls.email.value, this.registerForm.controls.password.value).subscribe(
      res => {
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
    );
  }

}
