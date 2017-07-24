import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})

export class DashboardComponent implements OnInit {
  showForm: boolean;
  isAdmin = false;
  userProfile: FirebaseObjectObservable<any>;
  userDetails;
  studentRegistration: FirebaseObjectObservable<any>;
  companyRegistration: FirebaseObjectObservable<any>;
  allCompanyOrStudentData = [];
  allCompany = [];
  allStudent = [];
  uid;
  constructor(public userProfileService: UserProfileService,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router) {

    this.getProfile();
  }

  ngOnInit(): void { }


  getProfile() {
    this.studentRegistration = this.db.object('/studentRegistration/', { preserveSnapshot: true });
    this.companyRegistration = this.db.object('/companyRegistration/', { preserveSnapshot: true });

    this.userProfile = this.db.object('/profiles/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    this.userProfile
      .subscribe(snapshots => {
        this.userDetails = snapshots.val();


        if (this.userDetails == null) {
          console.log("You are blocked by admin");
          alert("You are blocked by admin");
          this.router.navigate(['/login']);
        }

        else if (this.userDetails.designation == 'student') {
          this.showForm = true
          console.log("student");
          this.companyRegistration.subscribe((snapshots) => {
            snapshots.forEach(element => {
              this.allCompanyOrStudentData.push(element.val());
              console.log(this.allCompanyOrStudentData);

            });
          })
        }
        else if (this.userDetails.designation == 'organization') {
          this.showForm = true;
          console.log("company");
          this.studentRegistration.subscribe((snapshots) => {
            snapshots.forEach(element => {
              this.allCompanyOrStudentData.push(element.val());
              console.log(this.allCompanyOrStudentData);

            });
          })
        }

        else if (this.userDetails.designation == 'admin') {
          this.isAdmin = true;
          this.companyRegistration.subscribe((snapshots) => {
            snapshots.forEach(element => {
              this.allCompany.push(element.val());
              console.log(this.allCompany);

            });
          })

          this.studentRegistration.subscribe((snapshots) => {
            snapshots.forEach(element => {
              this.allStudent.push(element.val());
              console.log(this.allStudent);

            });
          })


        }
        else {
          alert("w");

        }


      })
  }

}
