import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { XuxemonComponent } from './xuxemon/xuxemon.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditarXuxemonComponent } from './editar-xuxemon/editar-xuxemon.component';
import { CreateXuxemonComponent } from './create-xuxemon/create-xuxemon.component';
import { ListXuxemonComponent } from './list-xuxemon/list-xuxemon.component';

@NgModule({
  declarations: [
    AppComponent,
    XuxemonComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    ErrorComponentComponent,
    EditarXuxemonComponent,
    CreateXuxemonComponent,
    ListXuxemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
