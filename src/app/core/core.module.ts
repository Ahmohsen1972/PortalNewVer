import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BoardFooterComponent } from './components/dashboard/board-footer/board-footer.component';
import { BoardHeaderComponent } from './components/dashboard/board-header/board-header.component';
import { NotificationPageComponent } from './components/notification-page/notification-page.component';

@NgModule({
  declarations: [
    NotificationPageComponent,
    PageNotFoundComponent,
    BoardFooterComponent,
    BoardHeaderComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, SharedModule, CoreRoutingModule, FontAwesomeModule],
  exports: [BoardHeaderComponent, BoardFooterComponent],
})
export class CoreModule {}
