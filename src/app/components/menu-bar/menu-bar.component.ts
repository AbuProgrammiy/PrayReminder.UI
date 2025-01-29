import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {
  @Input() userRole:any; 
  @Output() mode = new EventEmitter()

  changeMode(mode:string) {
    this.mode.emit(mode)
  }
}
