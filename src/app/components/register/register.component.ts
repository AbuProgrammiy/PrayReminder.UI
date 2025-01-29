import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @Output() mode=new EventEmitter()  

  constructor(private userService: UserService, private messageService: MessageService) { }

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
          this.messageService.add({ severity: 'success', summary: 'Muvaffaqiyat', detail: 'Xush kelibsiz' });
          localStorage.setItem("user", JSON.stringify(response.response))
          localStorage.setItem("isUserRegistered", "true")

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
