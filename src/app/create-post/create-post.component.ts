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
  jobPostByCompany: FirebaseListObservable<any>;
  jobPost: FirebaseListObservable<any>;
  userDetails;
  showForm: boolean = true;
  companyName: string;
  allJobPost = [];
  allJobPostKey = [];
  editPostIndex = -1;
  createPostButtonFlag = true;
  updatePostButtonFlag = false;
  applicantions = [];

  constructor(private fb: FormBuilder, public userProfileService: UserProfileService, public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.createForm();
    this.getProfile();
    this.getJobPosts();
  }

  ngOnInit() { }

  createForm() {
    this.jobForm = this.fb.group({

      organizationName: ['', Validators.required],
      jobTitle: ['Front End Developer', Validators.required],
      jobDetails: ['Experience 5 years', Validators.required],
      companyUid: [this.afAuth.auth.currentUser.uid]

    })
  }

  getProfile() {

    this.userProfile = this.db.object('/profiles/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    this.userProfile
      .subscribe(snapshots => {
        this.userDetails = snapshots.val();

        if (this.userDetails.designation == 'student') {
          this.showForm = false
        }
        else {
          this.showForm = true;
          this.companyName = snapshots.val().institute;
          this.jobForm.setValue({
            organizationName: snapshots.val().institute,
            jobTitle: 'Front End Developer',
            jobDetails: 'Experience 5 years',
            companyUid: this.afAuth.auth.currentUser.uid

          })
        }

      })
  }

  createAPost() {
    this.allJobPost = [];
    this.allJobPostKey = [];
    this.jobPostByCompany = this.db.list('/jobPostByCompany/' + this.afAuth.auth.currentUser.uid);

    this.jobPostByCompany.push(this.jobForm.value).then(res => {

      this.jobForm.setValue({
        organizationName: this.companyName,
        jobTitle: '',
        jobDetails: '',
        companyUid: this.afAuth.auth.currentUser.uid
      })

    });

    console.log(this.allJobPost);

  }

  getJobPosts() {

    this.jobPostByCompany = this.db.list('/jobPostByCompany/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    this.jobPostByCompany.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.allJobPostKey.push(snapshot.key);
        this.allJobPost.push(snapshot.val());
      });
    })

  }

  editAPost(i) {

    this.createPostButtonFlag = false;
    this.updatePostButtonFlag = true;

    this.editPostIndex = i;
    console.log("update");
    console.log(i);
    console.log(this.allJobPost[i]);
    console.log(this.allJobPostKey[i]);

    this.jobForm.setValue({
      organizationName: this.allJobPost[i].organizationName,
      jobTitle: this.allJobPost[i].jobTitle,
      jobDetails: this.allJobPost[i].jobDetails,
      companyUid: this.afAuth.auth.currentUser.uid
    })


  }

  updateAPost() {
    this.allJobPost = [];

    console.log("update");
    console.log(this.editPostIndex);
    this.jobPostByCompany = this.db.list('/jobPostByCompany/' + this.afAuth.auth.currentUser.uid);
    this.jobPostByCompany.update(this.allJobPostKey[this.editPostIndex], this.jobForm.value).then((res) => {
      this.jobForm.setValue({
        organizationName: this.companyName,
        jobTitle: '',
        jobDetails: '',
        companyUid: this.afAuth.auth.currentUser.uid
      })

      this.createPostButtonFlag = true;
      this.updatePostButtonFlag = false;

    });
  }


  viewApplications(i) {
      this.jobPostByCompany = this.db.list('/jobPostByCompany/' + this.afAuth.auth.currentUser.uid + '/' + this.allJobPostKey[i] + '/' + 'applications', { preserveSnapshot: true });
      this.jobPostByCompany.subscribe(snapshots => {
        this.applicantions = [];
        snapshots.forEach(snapshot => {
          this.applicantions.push(snapshot.val());
          console.log(this.applicantions);
        });
      })
  }

}
