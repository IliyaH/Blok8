import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { error } from '@angular/compiler/src/util';
import { ifError } from 'assert';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  selectValue: any;
  emailInUse: boolean = false;

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
  imageFile: File = null;

  constructor(private userService: UserService,public router: Router, private fb: FormBuilder, private authService: AuthenticationService) { }

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
    this.authService.register(this.registerForm.value).subscribe( data=>{

      if(!data)
      {
        window.alert('User with email: ' + this.registerForm.controls.email.value + ' already registered!')
        this.emailInUse = true;
      }
      else if (data.toString() == 200) 
      {
        let formData = new FormData();

        if(this.imageFile != null){
          formData.append('image', this.imageFile, this.imageFile.name);
          formData.append('email', this.registerForm.controls.email.value);
        }
        if(this.imageFile != null){
          this.userService.uploadImage(formData).subscribe();
        }
        window.alert('Successfully registered!');
        this.emailInUse = false;
        this.login();
      }
    });
  }
  
  login(){
    this.authService.login(this.registerForm.controls.email.value, this.registerForm.controls.password.value).subscribe(
      res => {

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
    );
  }

  onImageChange(event){
    this.imageFile = <File>event.target.files[0];
  }

}
