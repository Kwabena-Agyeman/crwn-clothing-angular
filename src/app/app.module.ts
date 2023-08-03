import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';

import { SigninComponent } from './auth/signin/signin.component';
import { RegisterComponent } from './auth/register/register.component';
import { BootstrapModule } from './bootstrap/bootstrap.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AuthComponent,
    SigninComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BootstrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
