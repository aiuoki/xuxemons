import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { XuxemonComponent } from './xuxemon/xuxemon.component';

@NgModule({
  declarations: [
    AppComponent,
    XuxemonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
