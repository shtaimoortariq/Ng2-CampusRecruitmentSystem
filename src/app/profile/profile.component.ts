import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  profileForm: FormGroup;
  userProfile: FirebaseObjectObservable<any>;
  checkStudentOrAdmin: boolean;

  ngOnInit() {
  }

  constructor(private fb: FormBuilder, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {

    this.getProfileData()
    this.createForm();
  }

  createForm() {
    this.profileForm = this.fb.group({
      name: ['a', Validators.required],
      userName: ['a', Validators.required],
      designation: ['a', Validators.required],
      location: ['a', Validators.required],
      contactNo: ['a', Validators.required]
    })
  }

  data() {
    console.log(this.profileForm.value);
  }


  getProfileData() {
    this.userProfile = this.db.object('/studentRegistration/' + this.afAuth.auth.currentUser.uid);
    this.userProfile.subscribe(snapshot => {
      console.log(snapshot.key);
      if (snapshot.key == undefined) {
        this.getCompanyProfile();
      }
    });
  }


  getCompanyProfile() {
    this.userProfile = this.db.object('/companyRegistration/' + this.afAuth.auth.currentUser.uid);
    this.userProfile.subscribe(snapshot => {
      console.log(snapshot.key);
    });
  }

  
}
