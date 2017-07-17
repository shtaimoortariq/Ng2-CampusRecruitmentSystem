import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../user-profile.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  jobForm: FormGroup;
  userProfile: FirebaseObjectObservable<any>;
  userDetails;
  showForm: boolean = true;

  constructor(private fb: FormBuilder, public userProfileService: UserProfileService, public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.createForm();

  }

  ngOnInit() {
    this.getProfile();
  }



  createForm() {
    this.jobForm = this.fb.group({

      organizationName: ['', Validators.required],
      jobTitle: ['Front End Developer', Validators.required],
      jobDetails: ['Experience 5 years', Validators.required]

    })
  }

  getProfile() {

    this.userProfile = this.db.object('/profiles/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    this.userProfile
      .subscribe(snapshots => {
        console.log(snapshots.key);
        console.log(snapshots.val());
        this.userDetails = snapshots.val();
        console.log(this.userDetails);

        if (this.userDetails.designation == 'student') {
          this.showForm = false
        }
        else {
          this.showForm = true;
        }

      })
  }

  createAPost() {
    console.log(this.jobForm.value);

  }

}
