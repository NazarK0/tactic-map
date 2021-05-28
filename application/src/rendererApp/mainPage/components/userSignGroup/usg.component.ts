import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import MilSignReqInterface from "../../types/milSignReq.interface";
import SelectedToolTypes from "../../types/selectedToolTypes.enum";
import USG_WithStateInterface from "../../types/toolGroupWithState.interface";

@Component({
  selector: 'tm-usg',
  templateUrl: './usg.component.html',
  styleUrls: ['./usg.component.scss']
})
export default class USG_Component implements OnInit, OnChanges {
  @Input('usg') usgProps!: USG_WithStateInterface;
  @Input('scrollTop') scrollTopProps!: number;

  @Output('selectSign') selectSignEvent = new EventEmitter<MilSignReqInterface>();

  showSigns!: boolean;
  offsetTop!: string;

  initializeValues(): void {
    this.showSigns = false;
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  ngOnChanges({ scrollTopProps }: SimpleChanges): void {
    this.offsetTop = `${(-1 * scrollTopProps.currentValue) + 14}px`;
  }

  onToggle(): void {
    this.showSigns = !this.showSigns;
  }

  onSelectSign(event: any): void {
    const usgId = Number(event.source.name);
    const signId = Number(event.source.id);
    const url: string = event.value;

    this.selectSignEvent.emit({ 
      usgId,
      signId,
      url,
      type: SelectedToolTypes.MilSign
    });
  }
}
