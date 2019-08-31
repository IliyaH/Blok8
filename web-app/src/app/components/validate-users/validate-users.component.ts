import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/models';
import { ControllerService } from 'src/app/services/controller/controller.service';

@Component({
  selector: 'app-validate-users',
  templateUrl: './validate-users.component.html',
  styleUrls: ['./validate-users.component.css']
})
export class ValidateUsersComponent implements OnInit {

  profileForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    address: ['', Validators.required],
    birthday: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    userType: ['', Validators.required],
  });

  users: User[] = [];
  selectedUserEmail: any;
  i: number;
  image: any = null;

  constructor(private fb: FormBuilder, private userService: UserService, private controllerService: ControllerService) { }

  ngOnInit() {
    this.getNotActiveUsers();
  }

  

  getNotActiveUsers(){
    this.userService.getNotActiveUsers().subscribe(
      data =>{
        this.users = data;
        if(this.users.length > 0){
          this.selectedUserEmail = this.users[0].Email;
          this.populateForm();
          this.userService.downloadImage(this.selectedUserEmail).subscribe(
            response => {
              if(response.toString() != "204"){
              this.image = 'data:image/jpeg;base64,' + response;
            }
            }
          );
        }
      }
    );
  }

  onSelectUser(event: any){
    this.selectedUserEmail = event.target.value;
    this.populateForm();
    this.userService.downloadImage(this.selectedUserEmail).subscribe(
      response => {
        if(response.toString() != "204"){
        this.image = 'data:image/jpeg;base64,' + response;
      }
      }
    );
  }

  populateForm(){

    for(this.i = 0; this.i < this.users.length; this.i++){
      if(this.users[this.i].Email == this.selectedUserEmail){
        this.profileForm.controls.name.setValue(this.users[this.i].Name);
        this.profileForm.controls.surname.setValue(this.users[this.i].Surname);
        this.profileForm.controls.address.setValue(this.users[this.i].Address);
        this.profileForm.controls.birthday.setValue(this.users[this.i].Birthday.split('T',1));
        this.profileForm.controls.email.setValue(this.users[this.i].Email);
        this.profileForm.controls.userType.setValue(this.users[this.i].UserType);
      }
    }

  }

  validate(){
    this.controllerService.validateUser(this.profileForm.controls.email.value, true).subscribe(
      data =>{
        this.profileForm.reset();
        this.getNotActiveUsers();
        this.image = null;
      }
    );
  }

  dismiss(){
    this.controllerService.validateUser(this.profileForm.controls.email.value, false).subscribe(
      data =>{
        this.profileForm.reset();
        this.getNotActiveUsers();
        this.image = null;
      }
    );
  }

}
