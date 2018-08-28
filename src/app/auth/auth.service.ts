import {Injectable} from '@angular/core';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private user: User;
  private isAuthenticated = false;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {
  }

  registerUser(authData: AuthData) {
    /*   this.user = {
         email: authData.email,
         userId: Math.round(Math.random() * 10000).toString()
       };*/
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(
        authData.email,
        authData.password
      )
      .then(result => {
        this.authSuccessfully();
      })
      .catch(error => {
        console.log(error);
      });
    // this.authSuccessfully();
  }

  login(authData: AuthData) {
    /*this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };*/
    this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
    })
      .catch(error => {
        console.log(error);
      });

    this.authSuccessfully();
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;



  }


  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }


}
