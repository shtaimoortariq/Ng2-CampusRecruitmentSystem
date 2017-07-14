import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Injectable()
export class UserService {

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router) { }

  studentRegistration: FirebaseObjectObservable<any>;
  companyRegistration: FirebaseObjectObservable<any>;

  //------------Create Firebase User
  createFirebaseUser(signupForm: any): Promise<string> {
    this.afAuth.auth.createUserWithEmailAndPassword(signupForm.userName, signupForm.password)
      .then((data) => {
        console.log(data);
        this.studentRegistration = this.db.object('/studentRegistration/' + this.afAuth.auth.currentUser.uid);
        this.companyRegistration = this.db.object('/companyRegistration/' + this.afAuth.auth.currentUser.uid);
        if (signupForm.designation == 'student')
          this.studentRegistration.set(signupForm);
        else
          this.companyRegistration.set(signupForm);


        this.router.navigate(['/dashboard']);
      })
      .catch(error => alert(error.message));
    console.log(signupForm);

    return Promise.resolve("true");
  }


  //------------sign In Firebase User
  signInFirebaseUser(loginForm: any): Promise<string> {

    this.afAuth.auth.signInWithEmailAndPassword(loginForm.email, loginForm.password)
      .then((data) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      })
      .catch(error => alert(error.message));
    console.log(loginForm);
    return Promise.resolve("true");

  }

}
