import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit {

  userProfile: FirebaseObjectObservable<any>;
  userDetails;

  constructor(public userProfileService: UserProfileService,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {

    // console.log(this.userProfileService.fetchUserProfile());

    //this.userProfile = this.db.list('/profiles/');
   

  }

  ngOnInit(): void {



  }

}
