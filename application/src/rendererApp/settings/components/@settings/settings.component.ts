import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'tm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export default class SettingsComponent implements OnInit, OnDestroy {
  urlSubscription: Subscription = new Subscription();
  hasItem!: boolean;

  constructor(
    private route: ActivatedRoute,
  ) { }

  initializeValues(): void {
    this.urlSubscription.add(
      this.route.params.subscribe(routeParams => {
        this.hasItem = Boolean(routeParams.id);
      })
    );
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe();
  }
}