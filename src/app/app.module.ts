import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { RegisterComponent } from './components/register/register.component';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { MyQuotesComponent } from './components/my-quotes/my-quotes.component';
import { InputOtpModule } from 'primeng/inputotp';
import { TooltipModule } from 'primeng/tooltip';
import { QuoteCardComponent } from './components/mini-components/quote-card/quote-card.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuBarComponent,
    RegisterComponent,
    AddQuoteComponent,
    MyQuotesComponent,
    QuoteCardComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    InputOtpModule,
    TooltipModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
