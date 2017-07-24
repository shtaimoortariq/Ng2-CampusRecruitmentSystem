import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { UserService } from "./user.service";
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate {

    userStatus;
    constructor(public userService: UserService, public afAuth: AngularFireAuth) {
            this.afAuth.authState.subscribe(auth => console.log(auth.uid));
    }//firebase.User.prototype.getIdToken

    canActivate() {
        console.log("The user is login");
        
        setTimeout(()=> {
            this.userStatus = this.userService.getStatus();
            console.log(this.userStatus);
        }, 3000)
        
        
        return true;

        // if (this.userStatus) {
        //     return true;
        // }
        // else {
        //     return false;
        // }
    }

}

