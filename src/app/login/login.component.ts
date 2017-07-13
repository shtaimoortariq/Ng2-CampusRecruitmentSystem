import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Email: string = "";
  Password: string = "";

  constructor() { }

  ngOnInit() {

  }

  Login() {
      console.log("My Email is: " +this.Email);
      console.log("My Password is: " +this.Password);
  }

}
