import { Component, EventEmitter, Input, Output } from '@angular/core';

import DSG_SignSelectedInterface from '../../../shared/types/dsgSignSelected.interface';

@Component({
  selector: 'tm-uas-sign-card',
  templateUrl: './signCard.component.html',
  styleUrls: ['./signCard.component.scss']
})
export default class UAS_SignCardComponent {
  @Input('sign') signProps!: DSG_SignSelectedInterface;
  @Output('select') selectEvent = new EventEmitter();

  onSelect(): void {
    this.selectEvent.emit();
  }

}