import { AfterViewInit, Component, ElementRef, NgZone,OnDestroy,OnInit, ViewChild } from "@angular/core";
import { select,Store } from "@ngrx/store";
import * as Pixi from 'pixi.js';
import { Observable, Subscription } from "rxjs";

import AppState from "../../../app.state";
import ErrorInterface from "../../../shared/types/error.interface";
import MapInterface from "../../types/map.interface";
import PixiKey from "../../types/pixiKey.interface";
import PixiKeyEvents from "../../types/pixiKeyEvents.interface";
import SelectedMilSignInterface from "../../types/selectedMilSign.interface";
import SelectedToolInterface from "../../types/selectedTool.interface";
import SelectedToolTypes from "../../types/selectedToolTypes.enum";
import { getMapAction } from "./store/actions/getMap.action";
import { getSelectedToolAction } from "./store/actions/getSelectedTool.action";
import { Image, Svg, SVG } from '@svgdotjs/svg.js'
import { currentLayerIndexSelector, errorSelector, isLoadingSelector, mapSelector, selectedToolSelector } from "./store/canvas.selectors";
import RendererLayers from "../../classes/rendererLayers.class";
import { getSvgSourceAction } from "./store/actions/getSvgSource.action";

@Component({
  selector: 'tm-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export default class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  public svg!: Svg;

  mapUrlSubscription: Subscription = new Subscription();
  selectedToolSubscription: Subscription = new Subscription();
  currentLayerSubscription: Subscription = new Subscription();

  isLoading$!: Observable<boolean>;
  isSubmitting$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;
  currentLayer!: Svg;

  map!: MapInterface | null;
  tool!: SelectedToolInterface | null;
  rLayers!: RendererLayers;
  rBackground!: Image;

  @ViewChild("innerCanvas") canvasDOM!: ElementRef<HTMLElement>;

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
          this.renderBackground();
        })
    );

    this.selectedToolSubscription.add(
      this.store.pipe(select(selectedToolSelector))
        .subscribe((tool) => {
          this.tool = tool;
          console.log(tool, 'TOOL SUBSCR')
        })
    );

    this.currentLayerSubscription.add(
      this.store.pipe(select(currentLayerIndexSelector))
        .subscribe((currentLayerIdx) => {
          this.currentLayer = this.rLayers.getLayer(currentLayerIdx)!;
          console.log(currentLayerIdx, 'LAYER SUBSCR')
        })
    );
  }

  initializeRenderer(): void {
    this.ngZone.runOutsideAngular(() => {
      
    });

    this.svg = SVG().addTo(this.canvasDOM.nativeElement).size(600, 400);    
  }

  initializeLayers(): void {
    this.rLayers = new RendererLayers(this.svg);
  }

  renderBackground(): void {
    if (!this.svg) return;
    if (!this.map) return;

    if (this.rBackground) {
      this.rBackground.load(this.map.url)
    } else {
      this.rBackground = this.svg.image(this.map.url)
    }

    this.svg.size(this.map.width, this.map.height);
  }

  currentLayerRenderer(): void {
    // this.currentLayer.svg(this.tool?.tool.value)
    const toolUrl = this.tool?.tool.value;

    if (toolUrl) {
      this.store.dispatch(getSvgSourceAction({ url: toolUrl }));
    }
  }
    

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.initializeRenderer();
    this.initializeLayers();
    this.rLayers.add();
    this.currentLayerRenderer();
  }

  ngOnDestroy(): void {
    this.mapUrlSubscription.unsubscribe();
    this.selectedToolSubscription.unsubscribe();
    this.currentLayerSubscription.unsubscribe();
  }
}
