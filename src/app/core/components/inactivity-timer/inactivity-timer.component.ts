import { Router } from '@angular/router';
import { takeUntil, take } from 'rxjs/operators';
import { Subject, timer, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ApiResponse } from '../../interfaces/api-response';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'inactivity-timer',
  templateUrl: './inactivity-timer.component.html',
  styleUrls: ['./inactivity-timer.component.scss'],
})
export class InactivityTimerComponent implements OnDestroy, OnInit {
  minutesDisplay = 0;
  secondsDisplay = 0;
  endTime = 1;

  unsubscribe$: Subject<void> = new Subject();
  timerSubscription: Subscription;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private localstorageservice: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.resetTimer();
    this.authService.userActionOccured
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }
        this.resetTimer();
      });
  }

  resetTimer(endTime: number = this.endTime) {
    const interval = 1000;
    const duration = endTime * 60 * 30;
    this.timerSubscription = timer(0, interval)
      .pipe(take(duration))
      .subscribe(
        (value) => this.render((duration - +value) * interval),
        (err) => {},
        () => {
          let rolKey = this.sessionStorageService.getItem('role_key');
          this.subscriptions.push(
            this.authService.logOut().subscribe((res: ApiResponse) => {
              if (res.success) {
                this.sessionStorageService.clear();
                this.localstorageservice.clear();
                if (rolKey != null && rolKey == 2) {
                  this.router.navigate(['/login/customer']);
                  (<any>window).Intercom('shutdown'); // to hide chat icon after log out
                } else this.router.navigate(['/']);
              }
            }),
          );
        },
      );
  }

  private render(count) {
    this.secondsDisplay = this.getSeconds(count);
    this.minutesDisplay = this.getMinutes(count);
  }

  private getSeconds(ticks: number) {
    const seconds = ((ticks % 60000) / 1000).toFixed(0);
    return this.pad(seconds);
  }

  private getMinutes(ticks: number) {
    const minutes = Math.floor(ticks / 60000);
    return this.pad(minutes);
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
