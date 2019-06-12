import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    address: ['', Validators.required],
    birthday: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    //password: ['', [Validators.required, Validators.minLength(8)]],
    //confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    //userType: ['', Validators.required],
    //image: [''],
  }/*, {validator: this.checkPassword}*/);

  userData: any;
  userProfileType: any;
  userProfileActivated: any;
  tempDate = new Date();
  selectValue: any;
  userRole: any;

  constructor(public router: Router, private fb: FormBuilder, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
    this.userRole = localStorage['role'];
    console.log(this.userRole);
  }

  checkPassword(group: FormGroup)
  {
      let pass = group.controls.password.value;
      let confirmPass = group.controls.confirmPassword.value;

      return pass == confirmPass ? null : {notSame: true}
  }

  onSelect(event : any)
  {
    this.selectValue = event.target.value;
  }

  edit(){
    this.authService.edit(this.profileForm.value).subscribe();
    window.alert('Data successfully edited!');
  }

  brisac(){
    this.authService.brisac(this.profileForm.value).subscribe();
    window.alert('Profile successfully deleted!');
    this.authService.logout();
    window.location.href = "/login";
  }
  getUser(){
    if(localStorage.getItem('name'))
    {
      this.userService.getUserData(localStorage.getItem('name')).subscribe( data =>{
        this.userData = data;

        this.userProfileActivated = this.userData.Activated;
        if(this.userData.Name)
        {
          this.profileForm.controls.name.setValue(this.userData.Name);
        }
        if(this.userData.Surname)
        {
          this.profileForm.controls.surname.setValue(this.userData.Surname);
        }
        if(this.userData.Address)
        {
          this.profileForm.controls.address.setValue(this.userData.Address);
        }
        if(this.userData.Birthday)
        {
          /*let year = this.userData.Birthday.split('-')[0];
          let month = this.userData.Birthday.split('-')[1];
          let tempday = this.userData.Birthday.split('-')[2];
          let day = tempday.split('T')[0];
          console.log(year + month + day);
          //let date = new Date(year+'-'+month+'-'+day);
          let date = new Date();
          console.log();
          this.profileForm.controls.birthday.setValue(date);*/
          let birthday =  this.userData.Birthday.split('T',2);
          this.profileForm.controls.birthday.setValue(`${birthday[0]}`);
        }
        if(this.userData.Email)
        {
          this.profileForm.controls.email.setValue(this.userData.Email);
        }
        /*if(this.userData.Password)
        {  
          this.profileForm.controls.password.setValue(this.userData.Password);
        }
        if(this.userData.ConfirmPass)
        {
          this.profileForm.controls.confirmPass.setValue(this.userData.ConfirmPass);
        }
        if(this.userData.UserType)
        {
          if(this.userData.UserType == 0)
          {
            this.selectValue = 'RegularUser';
            this.profileForm.controls.userType.setValue(this.selectValue);
          }
          else if(this.userData.UserType == 1)
          {
            this.selectValue = 'Student';
            this.profileForm.controls.userType.setValue(this.selectValue);
          }
          else if(this.userData.UserType == 2)
          {
            this.selectValue = 'Pensioner';
            this.profileForm.controls.userType.setValue(this.selectValue);
          }
        }
        if(this.userData.Image)
        {
          this.profileForm.controls.image.setValue(this.userData.Image);
        }*/
      
    });
    }
}

}
