import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {
  @Output() mode = new EventEmitter()

  changeMode(mode:string) {
    this.mode.emit(mode)
  }
}
