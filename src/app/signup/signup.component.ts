import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
        name:           ['a', Validators.required],
        userName:       ['a', Validators.required],
        password:       ['a', Validators.required],
        designation :   ['a', Validators.required],
        institute:      ['a', Validators.required]
        
    })
  }

  data() {
    console.log(this.signupForm.value);
  }

  ngOnInit() {
  }

}
