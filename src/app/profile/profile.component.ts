import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { UserTypeService } from '../user-type.service';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserTypeService]
})
export class ProfileComponent implements OnInit {


  profileForm: FormGroup;

  studentRegistration: FirebaseObjectObservable<any>;
  companyRegistration: FirebaseObjectObservable<any>;

  checkStudentOrAdmin: boolean;
  currentUser: any;
  userProfile: FirebaseObjectObservable<any>;
  currentProfile: {};

  ngOnInit() {

  }

  constructor(private fb: FormBuilder,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public userType: UserTypeService,
    public userProfileService: UserProfileService) {

    this.createForm();
    //this.userType.getUserType();
    this.studentRegistration = this.db.object('/studentRegistration/' + this.afAuth.auth.currentUser.uid);
    this.companyRegistration = this.db.object('/companyRegistration/' + this.afAuth.auth.currentUser.uid);;
    // debugger;
    console.log(this.userProfileService.getUserProfile());

    this.getProfileData();
    // this.userType.getUserType().then((res) => {
    //   debugger;
    //   console.log(res);
    //   this.getProfileData()
    // });
  }

  createForm() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      institute: ['', Validators.required]

    })
  }

  data() {
    console.log(this.profileForm.value);
  }


  getProfileData() {
    // setTimeout(() => {
    // this.profileForm.setValue({
    //   name: this.currentProfile[0].name,
    //   userName: this.currentProfile[0].userName,
    //   institute: this.currentProfile[0].institute

    // });

    // }, 5000)

    //   debugger;

    //   if (this.currentUser == "student") {
    //     debugger;
    //     this.studentRegistration = this.db.object('/studentRegistration/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    //     this.studentRegistration.subscribe(snapshot => {
    //       console.log(snapshot.key);
    //       console.log(snapshot.val());
    //     })
    //   }
    //   else {
    //     debugger;
    //     this.companyRegistration = this.db.object('/companyRegistration/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    //     this.companyRegistration.subscribe(snapshot => {
    //       console.log(snapshot.key);
    //       console.log(snapshot.val());
    //     })
    //   }
    // }


    this.userProfile = this.db.object('/profiles/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true })
    this.userProfile.subscribe(snapshots => {
      this.currentProfile = snapshots.val();
      setTimeout(() => {
        this.profileForm.setValue({
          name: snapshots.val().name,
          userName: snapshots.val().userName,
          institute: snapshots.val().institute

        });
      }, 3000)
    })



    // this.profileForm.setValue({
    //   name: this.currentProfile[0].name,
    //   userName: this.currentProfile[0].userName,
    //   designation: this.currentProfile[0].designation

    // });


  }
}