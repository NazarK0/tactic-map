import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import MilSignReqInterface from "../../types/milSignReq.interface";
import SelectedToolReqType from "../../types/selectedToolReq.type";
import SelectedToolTypes from "../../types/selectedToolTypes.enum";
import ToolGroupWithStateInterface from "../../types/toolGroupWithState.interface";
import USG_WithStateInterface from "../../types/toolGroupWithState.interface";

@Component({
  selector: 'tm-tools-group',
  templateUrl: './toolsGroup.component.html',
  styleUrls: ['./toolsGroup.component.scss']
})
export default class ToolsGroupComponent implements OnInit, OnChanges {
  @Input('group') groupProps!: ToolGroupWithStateInterface;
  @Input('scrollTop') scrollTopProps!: number;

  @Output('selectTool') selectSignEvent = new EventEmitter<SelectedToolReqType>();

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

  onSelectTool(event: any): void {
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
