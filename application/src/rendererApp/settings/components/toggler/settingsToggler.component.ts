import { Component, HostListener } from "@angular/core";

@Component({
  selector: 'tm-settings-toggler',
  templateUrl: './settingsToggler.component.html',
  styleUrls: ['./settingsToggler.component.scss']
})
export default class SettingsTogglerComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    // const windowWidth = event.target.innerWidth;
    //change title length
  }
}
