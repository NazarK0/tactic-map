import { AfterViewInit, Component, ElementRef, NgZone,OnDestroy,OnInit, ViewChild } from "@angular/core";
import { select,Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import AppState from "../../../app.state";
import ErrorInterface from "../../../shared/types/error.interface";
import MapInterface from "../../types/map.interface";
import SelectedToolInterface from "../../types/selectedTool.interface";
import { getMapAction } from "./store/actions/getMap.action";
import { Image, Svg, SVG } from '@svgdotjs/svg.js'
import { currentLayerIndexSelector, errorSelector, isLoadingSelector, mapSelector, selectedToolSelector } from "./store/canvas.selectors";
import RendererLayers from "../../classes/rendererLayers.class";
import SelectedToolTypes from "../../types/selectedToolTypes.enum";

@Component({
  selector: 'tm-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export default class CanvasComponent implements AfterViewInit, OnDestroy {
  public svg!: Svg;

  mapUrlSubscription: Subscription = new Subscription();
  selectedToolSubscription: Subscription = new Subscription();
  currentLayerSubscription: Subscription = new Subscription();

  isLoading$!: Observable<boolean>;
  isSubmitting$!: Observable<boolean>;
  error$!: Observable<ErrorInterface | null>;
  currentLayer!: Svg;

  tool!: SelectedToolInterface | null;
  rLayers!: RendererLayers;
  rBackground!: Image;

  @ViewChild("innerCanvas") canvasDOM!: ElementRef<HTMLElement>;

  constructor(
    private store: Store<AppState>,
    private ngZone: NgZone
  ) { }

  fetchData(): void {
    this.store.dispatch(getMapAction());
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  initializeCanvasMouseEvents(): void {
    this.rBackground.click(() => {
      if (this.tool && this.currentLayer) {
        switch (this.tool.type) {
          case SelectedToolTypes.MilSign:
            const toolSrc = this.tool.tool.svgSrc;
            console.log(toolSrc, 'Tool Src');
            this.currentLayer.svg(toolSrc);
            break;
          default:
            break;
        }
      }
    })
  }

  initializeListeners(): void {
    this.mapUrlSubscription.add(
      this.store.pipe(select(mapSelector))
        .subscribe((map) => {    
          if (map) {
            this.renderBackground(map);
          }
        })
    );

    this.selectedToolSubscription.add(
      this.store.pipe(select(selectedToolSelector))
        .subscribe((tool) => this.tool = tool)
    );
  }

  initializeRenderer(): void {
    this.ngZone.runOutsideAngular(() => {
      
    });

    this.svg = SVG().addTo(this.canvasDOM.nativeElement).size(600, 400);    
  }

  initializeLayers(): void {
    this.rLayers = new RendererLayers(this.svg);
    this.rLayers.add();

    this.currentLayerSubscription.add(
      this.store.pipe(select(currentLayerIndexSelector))
        .subscribe((currentLayerIdx) => {
          this.currentLayer = this.rLayers.getLayer(currentLayerIdx)!;
        })
    );
  }

  renderBackground(map: MapInterface): void {
    if (!this.svg) return;

    if (this.rBackground) {
      this.rBackground.load(map.url)
    } else {
      this.rBackground = this.svg.image(map.url)
    }
    
    this.svg.size(map.width, map.height);
  }

  ngAfterViewInit(): void {
    this.initializeRenderer();
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
    this.initializeLayers();
    this.initializeCanvasMouseEvents();
    
  }

  ngOnDestroy(): void {
    this.mapUrlSubscription.unsubscribe();
    this.selectedToolSubscription.unsubscribe();
    this.currentLayerSubscription.unsubscribe();
  }
}
