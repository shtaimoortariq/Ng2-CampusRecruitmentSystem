import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  ngOnInit() { }

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      name: ['a', Validators.required],
      userName: ['taimoortariqdev@gmail.com', Validators.required],
      password: ['123123', Validators.required],
      designation: ['', Validators.required],
      institute: ['a', Validators.required]
    })
  }

  signupUser() {
    let status = this.userService.createFirebaseUser(this.signupForm.value);
  }

}
