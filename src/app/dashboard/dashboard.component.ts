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
  userDetails;
  uid;
  adminUid;
  userProfile: FirebaseObjectObservable<any>;
  userProfileList: FirebaseListObservable<any>;
  studentRegistration: FirebaseObjectObservable<any>;
  studentRegistrationList: FirebaseListObservable<any>;
  companyRegistration: FirebaseObjectObservable<any>;
  companyRegistrationList: FirebaseListObservable<any>;
  jobPostByCompany: FirebaseListObservable<any>;
  jobPostList: FirebaseObjectObservable<any>;

  allCompanyOrStudentData = [];
  allCompany = [];
  allCompanyKey = [];
  allStudent = [];
  allStudentKey = [];
  applicantions = [];


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
        console.log(snapshots.val());
        console.log(this.isAdmin);
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
          this.adminUid = this.afAuth.auth.currentUser.uid;
          this.companyRegistration.subscribe((snapshots) => {
            this.allCompanyKey = [];
            this.allCompany = [];
            snapshots.forEach(element => {
              this.allCompanyKey.push(element.key);
              this.allCompany.push(element.val());
              console.log(this.allCompanyKey);
              console.log(this.allCompany);

            });
          })

          this.studentRegistration.subscribe((snapshots) => {
            this.allStudentKey = [];
            this.allStudent = [];
            snapshots.forEach(element => {
              this.allStudentKey.push(element.key);
              this.allStudent.push(element.val());
              console.log(this.allStudent);
              console.log(this.allStudentKey);

            });
          })


        }
        else {
          //console.log("You are blocked by admin");
          alert("W");
          //this.router.navigate(['/login']);


        }


      })
  }



  DeleteAccountCompany(i) {
    console.log(this.allCompanyKey[i]);

    this.userProfile = this.db.object('/profiles/' + this.allCompanyKey[i]);
    this.userProfile.set({ blockedProfile: true });

    this.jobPostByCompany = this.db.list('/jobPostByCompany/', { preserveSnapshot: true });
    this.jobPostByCompany.remove(this.allCompanyKey[i]);

    this.companyRegistrationList = this.db.list('/companyRegistration/');
    this.companyRegistrationList.remove(this.allCompanyKey[i]);




  }

  DeleteAccountStudent(i) {

    // this.jobPostByCompany = this.db.list('/jobPostByCompany/', { preserveSnapshot: true });
    // this.jobPostByCompany.subscribe(snapshots => {
    //   snapshots.forEach(snapshot => {
    //     this.applicantions.push(snapshot.val());
    //     console.log(this.applicantions);
    //       snapshot.forEach(data => { 
    //         console.log(data.val());
    //           data.forEach(datas => {
    //               console.log(datas.val());

    //           })

    //       })

    //   });
    // })
    this.userProfile = this.db.object('/profiles/' + this.allStudentKey[i]);
    this.userProfile.set({ blockedProfile: true });
    this.studentRegistrationList = this.db.list('/studentRegistration/');
    this.studentRegistrationList.remove(this.allStudentKey[i]);




    console.log(this.allStudentKey[i]);

  }


}
