import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserProfileService {

  userProfile: FirebaseObjectObservable<any>;
  currentProfile: object;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    console.log("USER PROFILE SERVICE");

  }

  // fetchUserProfile(): Promise<object> {
  //   this.userProfile = this.db.object('/profiles/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true })
  //     this.userProfile.subscribe(snapshots => {
  //       console.log(snapshots.key);
  //       console.log(snapshots.val());
  //       this.currentProfile = snapshots.val();
  //       console.log(this.currentProfile);

  //   })
  //     return Promise.resolve(this.currentProfile);
  // }

  fetchUserProfile() {
    debugger;
    this.userProfile = this.db.object('/profiles/h76QQWy4fzc3KOZblrfFc3By4fC2');
    console.log(this.userProfile);
    

  
      // this.userProfile.subscribe(snapshots => {
      //   console.log(snapshots.key);
      //   console.log(snapshots.val());
      //   this.currentProfile = snapshots.val();
      //   console.log(this.currentProfile);
      // })
    
      //    return this.currentProfile;
  
       

    // return this.userProfile
    // .map((res: Response) => {
    //   console.log(res.json());
    // })
  }

  getUserProfile() {
    console.log("User Profile");
    console.log(this.currentProfile);
    return this.currentProfile;
  }

}
