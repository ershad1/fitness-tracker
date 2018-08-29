import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  @Output()
  closeSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.isAuth$ = this.store.pipe(select(fromRoot.getIsAuth));

  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
