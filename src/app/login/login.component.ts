import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  ngOnInit() {  }

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['taimoortariqdev@gmail.com', Validators.required],
      password: ['123123', Validators.required]
    })
  }

  loginUser() {
    let status = this.userService.signInFirebaseUser(this.loginForm.value);
    console.log(status);
  }

}
