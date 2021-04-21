import { Component, EventEmitter, Input, Output } from '@angular/core';

import DSG_SignInterface from '../../../../types/dsgSign.interface';

@Component({
  selector: 'tm-dsg-sign-card',
  templateUrl: './dsgSignCard.component.html',
  styleUrls: ['./dsgSignCard.component.scss']
})
export default class DSG_SignCardComponent {
  @Input('sign') signProps!: DSG_SignInterface;

  @Output('select') selectEvent = new EventEmitter();
  @Output('edit') editEvent = new EventEmitter();
  @Output('delete') deleteEvent = new EventEmitter();

  onSelect(): void {
    this.selectEvent.emit();
  }

  onEdit(): void {
    this.editEvent.emit();
  }

  onDelete(): void {
    this.deleteEvent.emit();
  }
}