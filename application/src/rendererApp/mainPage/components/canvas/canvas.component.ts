import { AfterViewInit, Component, ElementRef, NgZone,OnDestroy,OnInit, ViewChild } from "@angular/core";
import { select,Store } from "@ngrx/store";
import * as Pixi from 'pixi.js';
import { Observable, Subscription } from "rxjs";

import AppState from "../../../app.state";
import ErrorInterface from "../../../shared/types/error.interface";
import SelectedMilSignInterface from "../../types/selectedMilSign.interface";
import { getMapAction } from "./store/actions/getMap.action";
import { errorSelector, isLoadingSelector, mapUrlSelector, selectedSignSelector } from "./store/canvas.selectors";

@Component({
  selector: 'tm-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export default class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  public app!: Pixi.Application;

  mapUrlSubscription: Subscription = new Subscription();
  selectedSignSubscription: Subscription = new Subscription();

  isLoading$!: Observable<boolean>;
  isSubmitting$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;

  mapUrl!: string | null;
  milSign!: SelectedMilSignInterface | null;

  @ViewChild("innerCanvas") canvasDOM!: ElementRef;

  constructor(
    private store: Store<AppState>,
    private ngZone: NgZone
  ) {}

  fetchData(): void {
    this.store.dispatch(getMapAction());
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  initializeListeners(): void {
    this.mapUrlSubscription.add(
      this.store.pipe(select(mapUrlSelector))
        .subscribe((url) => this.mapUrl = url)
    );

    this.selectedSignSubscription.add(
      this.store.pipe(select(selectedSignSelector))
        .subscribe((sign) => this.milSign = sign)
    );
  }

  initializePixi(): void {
    this.app = new Pixi.Application({});
    this.ngZone.runOutsideAngular(() => {
      this.canvasDOM.nativeElement.appendChild(this.app.view);
    });

    const mapTexture = Pixi.Texture.from(this.mapUrl || '');
    const map = new Pixi.Sprite(mapTexture);

    map.anchor.x = 0;
    map.anchor.y = 0;

    map.position.x = 0;
    map.position.y = 0;
    
    this.app.stage.addChild(map);
    // console.log(this.mapUrl, 'URL')
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.initializePixi();
  }

  ngOnDestroy(): void {
    this.mapUrlSubscription.unsubscribe();
    this.selectedSignSubscription.unsubscribe();
  }
}
