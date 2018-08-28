import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {UiService} from '../../shared/service/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadingSubscription: Subscription;
  maxDate;

  constructor(private authService: AuthService, private uiService: UiService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe( isLoading => {
      this.isLoading = isLoading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
    // console.log(form);
  }
  ngOnDestroy () {
    this.loadingSubscription.unsubscribe();
  }


}
