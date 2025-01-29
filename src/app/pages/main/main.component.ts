import { MessageService } from 'primeng/api';
import { QuoteService } from './../../service/quote/quote.service';
import { Component } from '@angular/core';
import { TelegramService } from '../../service/telegram/telegram.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  mode!:string
  userRole:any

  constructor(){
    if(typeof localStorage !=="undefined"){

      const role=localStorage.getItem("user")

      if(role){
        this.userRole=JSON.parse(role).role
      }

      if(localStorage.getItem("isUserRegistered")=="true"){
        this.mode="add-quote"
      }
      else{
        this.mode ="register"
      }
    }
  }

  changeMode(mode:any){
    this.mode=mode
  }
}