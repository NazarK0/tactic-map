import { Component, EventEmitter, Input, Output } from '@angular/core';

import DSG_SignInterface from '../../../../types/dsgSign.interface';

@Component({
  selector: 'tm-usg-sign-card',
  templateUrl: './usgSignCard.component.html',
  styleUrls: ['./usgSignCard.component.scss']
})
export default class USG_SignCardComponent {
  @Input('sign') signProps!: DSG_SignInterface;

  @Output('select') selectEvent = new EventEmitter();
  @Output('edit') editEvent = new EventEmitter();
  @Output('delete') deleteEvent = new EventEmitter();

  onSelect(): void {
    this.selectEvent.emit();
  }

  onDelete(): void {
    this.deleteEvent.emit();
  }
}