import {NgModule} from '@angular/core';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared/shared.module';
import {AngularFireAuthModule} from 'angularfire2/auth';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    AngularFireAuthModule
  ],
  exports: []
})
export class AuthModule {
}
