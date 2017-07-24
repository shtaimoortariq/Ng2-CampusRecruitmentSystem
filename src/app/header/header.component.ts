import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userProfile: FirebaseObjectObservable<any>;
  userDetails;
  showForm: boolean = true;

  constructor(public userProfileService: UserProfileService, public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    console.log(this.userProfileService.getUserProfile);
  }



  ngOnInit() {
    this.getProfile();
  }


  getProfile() {

    this.userProfile = this.db.object('/profiles/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    this.userProfile
      .subscribe(snapshots => {
        this.userDetails = snapshots.val();
        if (this.userDetails.designation == 'student') {
          this.showForm = false
        }
        else if (this.userDetails.designation == 'admin') {
          this.showForm = false
        }
        else {
          this.showForm = true;
        }
      })
  }

}
