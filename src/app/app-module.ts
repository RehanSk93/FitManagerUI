import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { Navbar } from './shared/components/navbar/navbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MockAuthInterceptor } from './core/interceptors/mock-auth-interceptor';
import { Unauthorized } from './features/unauthorized/unauthorized';

@NgModule({
  declarations: [
    App,
    Navbar,
    Unauthorized
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: HTTP_INTERCEPTORS, useClass: MockAuthInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }
