import {Component, OnInit, Inject} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import * as moment from 'moment';
import {CurrentCalendarViewService} from '../../app/components/models/currentClendarView.service';

@Component({
  selector: 'day-view-page',
  templateUrl: 'dayViewPage.html'
})
export class DayViewPage implements OnInit {
  date: moment.Moment;
  displayDate: string;

  constructor(@Inject(NavParams) private navParams: NavParams,
              @Inject(CurrentCalendarViewService) private currentCalendarView: CurrentCalendarViewService,
              @Inject(NavController) private navController: NavController) {

  }

  ngOnInit() {
    this.date = this.currentCalendarView.currentDate;
    this.displayDate = this.date.format('DD MMMM');

    this.setBackButton();
    this.navController.viewWillEnter.subscribe(() => {
      this.setBackButton();
    });

  }

  private setBackButton() {
    this.navController.getActive().getNavbar().setBackButtonText(this.date.format('MMMM'));
  }
}
