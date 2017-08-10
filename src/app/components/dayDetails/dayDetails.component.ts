import {Component, OnInit, Inject} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {CalendarStore, IDateInfo} from '../models/calendar.store';
import {NavParams, NavController} from 'ionic-angular';
import {EventTypeService, EventType, IEventInput} from '../models/eventType.service';
import {DayEvent} from '../models/dayEvent.model';
import {EventTypesPage} from '../../../pages/editEventTypes/editEventTypes';

@Component({
  selector: 'day-details',
  templateUrl: './dayDetails.template.html'
})
export class DayDetails implements OnInit {

  info: IDateInfo;
  types: EventType[];
  date: moment.Moment;

  eventInputs: any[];

  eventTypeTitle: string;
  eventTitle: string;
  eventTypesPage: any;

  constructor(@Inject(NavParams) private navParams: NavParams,
    @Inject(NavController) private navController: NavController,
    @Inject(EventTypeService) private typeService: EventTypeService,
    @Inject(CalendarStore) private calendarStore: CalendarStore) {
    this.eventTypesPage = EventTypesPage;
  }

  ngOnInit() {
    this.date = this.navParams.get('date');
    this.updateEvents();
    this.navController.viewWillEnter.subscribe(() => {
      this.updateEvents();
    });
  }

  private updateEvents() {
    this.info = this.calendarStore.getInfo(this.date);
    this.types = this.typeService.getAllTypes();
    this.eventTypeTitle = _.get(this.types[0], 'title');
    this.makeInputs();
  }

  addEvent() {
    const event = new DayEvent(this.typeService.getType(this.eventTypeTitle), this.eventTitle)
    this.calendarStore.addEvent(this.date, event);
    this.info = this.calendarStore.getInfo(this.date);
  }

  makeInputs() {
    const type = this.typeService.getType(this.eventTypeTitle);
    this.eventInputs = type.inputs.map((input: IEventInput) => _.assign({}, input, {value: ''}));
  }

  removeEvent(event: DayEvent) {
    this.calendarStore.removeEvent(this.date, event);
  }

}
