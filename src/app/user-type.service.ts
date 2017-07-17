import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';



@Injectable()
export class UserTypeService {

  studentRegistration: FirebaseListObservable<any>;
  companyRegistration: FirebaseListObservable<any>;
  userIdsStudent: any[] = [];
  userIdsCompany: any[] = [];
  userType = "";

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.studentRegistration = this.db.list('/studentRegistration/');
    this.companyRegistration = this.db.list('/companyRegistration/');
  }


  checkUserType(): Promise<string> {


    this.studentRegistration = this.db.list('/studentRegistration', { preserveSnapshot: true });
    this.studentRegistration
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.userIdsStudent.push(snapshot.key);
          console.log(this.userIdsStudent);
        });
        let temp = this.userIdsStudent.indexOf(this.afAuth.auth.currentUser.uid);
        console.log(temp);
        if (temp >= 0) {
          this.userType = "student";
          console.log(this.userType);
        }
      })


    this.companyRegistration = this.db.list('/companyRegistration', { preserveSnapshot: true });
    this.companyRegistration
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.userIdsCompany.push(snapshot.key);
          console.log(this.userIdsCompany);
        });

        let temp = this.userIdsCompany.indexOf(this.afAuth.auth.currentUser.uid);
        console.log(temp);
        if (temp >= 0) {
          this.userType = "company";
          console.log(this.userType);
        }
      })

    return Promise.resolve("")
  }


  getUserType(): any {
    
    this.checkUserType().then((res)=> {
        console.log(res);
        return this.userType;
    })
       
  }

}
