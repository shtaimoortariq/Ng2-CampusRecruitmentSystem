import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  jobPost: FirebaseListObservable<any>;
  allJobPostVal = [];
  allJobPost2 = [];
  allJobPostKey = [];
  userProfile: FirebaseObjectObservable<any>;
  userDetails;
  deleteButton = false;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    console.log("asdfasf");
    this.getJobPosts();
    this.getProfile();
    
  }


  ngOnInit() {

  }

  getProfile() {

    this.userProfile = this.db.object('/profiles/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    this.userProfile
      .subscribe(snapshots => {
        this.userDetails = snapshots.val();
        if(this.userDetails.designation == 'admin') {
            this.deleteButton = true;
        }
        
        console.log(this.userDetails);
        
      })
  }


  getJobPosts() {
    
    this.jobPost = this.db.list('/jobPostByCompany/', { preserveSnapshot: true });
    this.jobPost.subscribe(snapshots => {

      this.allJobPostKey = [];
      this.allJobPostVal = [];

      snapshots.forEach(snapshot => {
        snapshot.forEach(snapshot => {

          this.allJobPostKey.push(snapshot.key);
          this.allJobPostVal.push(snapshot.val());
          console.log(this.allJobPostKey);
          console.log(this.allJobPostVal);
        })
      });
    })

  }

  DeletePost(i) {
     console.log(this.allJobPostKey[i]);
    console.log(this.allJobPostVal[i]);

  }

  applyForPost(i) {
    console.log(i);
    console.log(this.allJobPostKey[i]);
    console.log(this.allJobPostVal[i]);
    console.log('/jobPostByCompany/' + this.allJobPostVal[i].companyUid + '/' + this.allJobPostKey[i] + '/')
    this.jobPost = this.db.list('/jobPostByCompany/' + this.allJobPostVal[i].companyUid + '/' + this.allJobPostKey[i] + '/applications', { preserveSnapshot: true });
    this.jobPost.push(this.userDetails);

  }

}
