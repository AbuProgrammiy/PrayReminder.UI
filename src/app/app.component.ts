import { Component } from '@angular/core';
import { openDB } from 'idb';
import { DatabaseService } from './service/database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private databse:DatabaseService){
    databse.saveData("start","true")
  }
  title = 'template';
}