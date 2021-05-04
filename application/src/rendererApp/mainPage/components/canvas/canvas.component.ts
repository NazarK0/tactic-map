import { AfterViewInit, Component, ElementRef, NgZone,OnDestroy,OnInit, ViewChild } from "@angular/core";
import { select,Store } from "@ngrx/store";
import * as Pixi from 'pixi.js';
import { Observable, Subscription } from "rxjs";

import AppState from "../../../app.state";
import ErrorInterface from "../../../shared/types/error.interface";
import MapInterface from "../../types/map.interface";
import SelectedMilSignInterface from "../../types/selectedMilSign.interface";
import { getMapAction } from "./store/actions/getMap.action";
import { errorSelector, isLoadingSelector, mapSelector, selectedSignSelector } from "./store/canvas.selectors";

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

  map!: MapInterface | null;
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
      this.store.pipe(select(mapSelector))
        .subscribe((map) => {
          this.map = map;        
          this.updateMap();
        })
    );

    this.selectedSignSubscription.add(
      this.store.pipe(select(selectedSignSelector))
        .subscribe((sign) => this.milSign = sign)
    );
  }

  initializePixi(): void {
    this.ngZone.runOutsideAngular(() => {
      this.app = new Pixi.Application();
    });

    this.app.renderer.backgroundColor = 0xffffff;
    this.canvasDOM.nativeElement.appendChild(this.app.view);
  }

  updateMap(): void {
    if (!this.app || !this.map) return;

    const mapTexture = Pixi.Texture.from(this.map.url);
    const map = new Pixi.Sprite(mapTexture);

const base: any = { ...mapTexture.baseTexture.resource };
Object
    console.log(base.source.width, 'TEXTURE');
    console.log(base, 'TEXTURE');
    console.log(mapTexture.baseTexture.resource.height, 'TEXTURE');
    console.log(map, 'MAP');

    const imgWidth = 1920;
    const imgHeight = 1200;
    
    this.app.renderer.resize(this.map.width, this.map.height)
    // this.canvasDOM.nativeElement.style.width = `${imgWidth}px`;
    // this.canvasDOM.nativeElement.style.height = `${imgHeight}px`;

    map.anchor.x = 0;
    map.anchor.y = 0;

    map.position.x = 0;
    map.position.y = 0;
    
    this.app.stage.addChild(map);
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.initializePixi();
    this.updateMap();
  }

  ngOnDestroy(): void {
    this.mapUrlSubscription.unsubscribe();
    this.selectedSignSubscription.unsubscribe();
  }
}
