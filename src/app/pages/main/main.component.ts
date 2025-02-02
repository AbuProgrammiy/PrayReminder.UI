import { MessageService } from 'primeng/api';
import { QuoteService } from './../../service/quote/quote.service';
import { Component } from '@angular/core';
import { TelegramService } from '../../service/telegram/telegram.service';
import { UserService } from '../../service/user/user.service';
import { DatabaseService } from '../../service/database/database.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  mode!: string
  userRole: any

  constructor(private userservice: UserService, private database: DatabaseService) {

    let user

    database.loadData("user").then(value => {
      user = value
      if (user) {
        this.userRole = JSON.parse(user).role
      }
    })

    let isUserRegistered

    database.loadData("isUserRegistered").then(value => {
      isUserRegistered = value

      if (isUserRegistered == "true") {
        this.getUser(JSON.parse(user!).id)
  
        this.mode = "add-quote"
      }
      else {
        this.mode = "register"
      }
    })
  }

  getUser(id: number) {
    this.userservice.getById(id).subscribe({
      next: (response) => {
        this.database.saveData("user", JSON.stringify(response.response))
        this.userRole = response.response.role
        console.log(this.userRole)
      },
      error: (err) => {

      }
    })
  }

  changeMode(mode: any) {
    this.mode = mode
  }
}