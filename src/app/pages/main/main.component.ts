import { MessageService } from 'primeng/api';
import { QuoteService } from './../../service/quote/quote.service';
import { Component } from '@angular/core';
import { TelegramService } from '../../service/telegram/telegram.service';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  mode!:string
  userRole:any

  constructor(private userservice:UserService){
    if(typeof localStorage !=="undefined"){

      const role=localStorage.getItem("user")

      if(role){
        this.userRole=JSON.parse(role).role
      }

      if(localStorage.getItem("isUserRegistered")=="true"){
        this.getUser(JSON.parse(localStorage.getItem("user")!).id)

        this.mode="add-quote"
      }
      else{
        this.mode ="register"
      }
    }
  }

  getUser(id:number){
    this.userservice.getById(id).subscribe({
      next:(response)=>{
        localStorage.setItem("user",JSON.stringify(response.response))
        this.userRole=response.response.role
        console.log(this.userRole)
      },
      error:(err)=>{

      }
    })
  }

  changeMode(mode:any){
    this.mode=mode
  }
}