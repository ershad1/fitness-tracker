import {Injectable} from '@angular/core';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../trining/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private user: User;
  private isAuthenticated = false;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth, private trainingService: TrainingService) {
  }

  initAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(
        authData.email,
        authData.password
      )
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
    })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
