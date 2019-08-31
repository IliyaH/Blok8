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
    activated: ['', Validators.required],
    image: [''],
    userType: ['', Validators.required],
  });

  userData: any;
  userProfileType: any;
  userProfileActivated: any;
  tempDate = new Date();
  selectValue: any;
  userRole: any;
  showFile: boolean;
  image: any = null;
  imageFile: File = null;

  constructor(public router: Router, private fb: FormBuilder, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
    this.userRole = localStorage['role'];

    
  }

  checkPassword(group: FormGroup)
  {
      let pass = group.controls.password.value;
      let confirmPass = group.controls.confirmPassword.value;

      return pass == confirmPass ? null : {notSame: true}
  }

  onSelect(event : any)
  {
    this.profileForm.controls.userType.setValue(event.target.value);
    if(event.target.value != '0'){
      this.showFile = true;
    }
    else{
      this.showFile = false;
    }
  }

  edit(){
    let formData = new FormData();

    if(this.imageFile != null){
      formData.append('image', this.imageFile, this.imageFile.name);
      formData.append('email', this.profileForm.controls.email.value);
      this.profileForm.controls.activated.setValue('0');
      
    }

    this.authService.edit(this.profileForm.value).subscribe(
      data=>{
        if(this.imageFile != null){
          this.userService.uploadImage(formData).subscribe();
        }
      }
    );
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
        this.selectValue = this.userData.UserType;
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
          
          let birthday =  this.userData.Birthday.split('T',2);
          this.profileForm.controls.birthday.setValue(`${birthday[0]}`);
        }
        if(this.userData.Email)
        {
          this.profileForm.controls.email.setValue(this.userData.Email);
        }
        
        this.profileForm.controls.activated.setValue(this.userData.Activated);
        this.profileForm.controls.userType.setValue(this.userData.UserType);

        if(this.selectValue != '0'){ 
          if(this.userProfileActivated == '2' || this.userProfileActivated == '0'){
            this.showFile = true;
          }
        }
        else{
          this.showFile = false;
        }
      
    });
    }
}

onImageChange(event){
  this.imageFile = <File>event.target.files[0];
}

}
