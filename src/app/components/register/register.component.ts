import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { MessageService } from 'primeng/api';
import { DatabaseService } from '../../service/database/database.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @Output() mode=new EventEmitter()  

  constructor(private userService: UserService, private messageService: MessageService,private database:DatabaseService) { }

  tempCode: any
  warnMsg!: string

  isLoading: boolean = false

  submit() {
    this.isLoading = true
    if (this.tempCode == null) {
      this.warnMsg = "kodni kiriting!"
      this.isLoading = false
      return
    }
    this.userService.checkTempCode(this.tempCode).subscribe({
      next: (response) => {
        if (response.statusCode == 200) {
          this.database.saveData("user",JSON.stringify(response.response))
          this.database.saveData("isUserRegistered","true")

          this.messageService.add({ severity: 'success', summary: 'Muvaffaqiyat', detail: 'Xush kelibsiz' });
          
          this.mode.emit("add-quote")
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Diqqat!', detail: response.response });
        }
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadur xato ketdi!' });
      }
    })
  }
}
