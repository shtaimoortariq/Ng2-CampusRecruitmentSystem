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
  jobPost: FirebaseListObservable<any>;
  userDetails;
  showForm: boolean = true;
  companyName: string;
  allJobPost = [];
  allJobPostKey = [];
  editPostIndex = -1;

  constructor(private fb: FormBuilder, public userProfileService: UserProfileService, public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.createForm();
    this.getProfile();
    this.getJobPosts();
  }

  ngOnInit() {

    //  setTimeout(() => {

    //  }, 5000)
  }

  createForm() {
    this.jobForm = this.fb.group({

      organizationName: ['', Validators.required],
      jobTitle: ['Front End Developer', Validators.required],
      jobDetails: ['Experience 5 years', Validators.required]

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
            jobDetails: 'Experience 5 years'
          })
        }

      })
  }

  createAPost() {
    this.allJobPost = [];
    this.allJobPostKey = [];
    this.jobPost = this.db.list('/jobPost/' + this.afAuth.auth.currentUser.uid);
    
    this.jobPost.push(this.jobForm.value).then(res => {
      
      this.jobForm.setValue({
        organizationName: this.companyName,
        jobTitle: '',
        jobDetails: ''
      })

    });

    console.log(this.allJobPost);

  }

  getJobPosts() {

    this.jobPost = this.db.list('/jobPost/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    this.jobPost.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.allJobPostKey.push(snapshot.key);
        this.allJobPost.push(snapshot.val());
      });
    })

  }

  editAPost(i) {
    this.editPostIndex = i;
    console.log("update");
    console.log(i);
    console.log(this.allJobPost[i]);
    console.log(this.allJobPostKey[i]);
    
    this.jobForm.setValue({
      organizationName: this.allJobPost[i].organizationName,
      jobTitle: this.allJobPost[i].jobTitle,
      jobDetails: this.allJobPost[i].jobDetails
    })

     
  }

  updateAPost() {  
    console.log("update");
    console.log(this.editPostIndex);
    this.jobPost = this.db.list('/jobPost/' + this.afAuth.auth.currentUser.uid);  
    this.jobPost.update(this.allJobPostKey[this.editPostIndex], this.jobForm.value).then((res)=> {this.createAPost()});
  }

}
