import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

        userName: ['', Validators.required],
        password: ['', Validators.required],
        designation : ['', Validators.required]
    })
  }

  data() {
    console.log(this.signupForm.value);
  }

  ngOnInit() {
  }

}
