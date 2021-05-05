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
  pixiKeyEvents!: PixiKeyEvents;
  layers: Pixi.Container = new Pixi.Container(); //all signs and shapes

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
    this.initializePixiKeyEvents();
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

  initializePixiKeyEvents(): void {
    this.pixiKeyEvents = {
      down: this.keyboard('ArrowDown'),
      left: this.keyboard('ArrowLeft'),
      right: this.keyboard('ArrowRight'),
      up: this.keyboard('ArrowUp')
    }

    this.initializePixiKeyHandlers();
  }

  initializePixiKeyHandlers(): void {
    this.pixiKeyEvents.down.press = () => {

    }
    this.pixiKeyEvents.down.release = () => {

    }

    this.pixiKeyEvents.left.press = () => {

    }
    this.pixiKeyEvents.left.release = () => {
      
    }

    this.pixiKeyEvents.right.press = () => {

    }
    this.pixiKeyEvents.right.release = () => {

    }

    this.pixiKeyEvents.up.press = () => {

    }
    this.pixiKeyEvents.up.release = () => {

    }
  }

  unsubscribePixiKeyHandlers(): void {
    this.pixiKeyEvents.down.unsubscribe();
    this.pixiKeyEvents.left.unsubscribe();
    this.pixiKeyEvents.right.unsubscribe();
    this.pixiKeyEvents.up.unsubscribe();
  }

  initializePixiPointerEvents(entity: Pixi.DisplayObject) {
    entity.interactive = true;
    entity.cursor = 'pointer';
    
    entity.on('click', this.pixiMouseClickEventHandler)
    entity.on('mousedown',  this.pixiMouseDownEventHandler)
    entity.on('mousemove',  this.pixiMouseMoveEventHandler)
    entity.on('mouseout',  this.pixiMouseOutEventHandler)
    entity.on('mouseover',  this.pixiMouseOverEventHandler)
    entity.on('mouseup',  this.pixiMouseUpEventHandler)
    entity.on('mouseupoutside',  this.pixiMouseUpOutsideEventHandler)
    entity.on('rightclick',  this.pixiMouseRightClickEventHandler)
    entity.on('rightdown',  this.pixiMouseRightDownEventHandler)
    entity.on('rightup',  this.pixiMouseRightUpEventHandler)
    entity.on('rightupoutside',  this.pixiMouseRightUpOutsideEventHandler)
  }

  private pixiMouseClickEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event.data.global.x, 'click')
    console.log(event.data.global.y, 'click')
    const {data: {global: {x: posX, y: posY }}} = event;

    console.log('MIL SIGN', this.milSign)
    if (this.milSign) {
      console.log('MIL SIGN', this.milSign)
      const texture = Pixi.Texture.from(this.milSign!.value);
      const sprite = new Pixi.Sprite(texture);
      this.initializePixiPointerEvents(sprite);

      sprite.anchor.x = 0;
      sprite.anchor.y = 0;

      sprite.position.x = posX;
      sprite.position.y = posY;
      
      this.layers.addChild(sprite);
    }
  }

  private pixiMouseDownEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event, 'mousedown')
  }

  private pixiMouseMoveEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event, 'mousemove')
  }

  private pixiMouseOutEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event, 'mouseout')
  }

  private pixiMouseOverEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event, 'mouseover')
  }

  private pixiMouseUpEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event, 'mouseup')
  }

  private pixiMouseUpOutsideEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event, 'mouseupoutside')
  }

  private pixiMouseRightClickEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event, 'rightclick')
  }

  private pixiMouseRightDownEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event, 'rightdown')
  }

  private pixiMouseRightUpEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event, 'rightup')
  }

  private pixiMouseRightUpOutsideEventHandler(event: Pixi.InteractionEvent): void {
    console.log(event, 'rightupoutside')
  }

  initializePixi(): void {
    this.ngZone.runOutsideAngular(() => {
      this.app = new Pixi.Application();
    });

    this.app.renderer.backgroundColor = 0xffffff;
    this.canvasDOM.nativeElement.appendChild(this.app.view);
    this.app.stage.addChild(this.layers);
  }

  updateMap(): void {
    if (!this.app || !this.map) return;

    const mapTexture = Pixi.Texture.from(this.map.url);
    const map = new Pixi.Sprite(mapTexture);
    this.initializePixiPointerEvents(map);

    this.app.renderer.resize(this.map.width, this.map.height)

    map.anchor.x = 0;
    map.anchor.y = 0;

    map.position.x = 0;
    map.position.y = 0;
    
    this.app.stage.addChild(map);
  }

  private keyboard(value: string): PixiKey {
    //The `downHandler`
    const downHandler = (event: any) => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    const upHandler = (event: any) => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };

     // Detach event listeners
     const unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };

    let key: PixiKey = {
      value,
      isDown: false,
      isUp: true,
      press: null,
      release: null,
      downHandler,
      upHandler,
      unsubscribe,
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
   
    
    return key;
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
    this.unsubscribePixiKeyHandlers()
  }
}
