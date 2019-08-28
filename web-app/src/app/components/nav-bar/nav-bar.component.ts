import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn = undefined;


  constructor(public router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.loggedIn = localStorage['role'];
    console.log(this.loggedIn);
    console.log(this.router.url);
  }

  logOut(){
    this.authService.logout();
    this.loggedIn = localStorage['role'];
  }

}
