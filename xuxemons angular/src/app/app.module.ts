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
import { CreateComponent } from './components/xuxemons/create/create.component';
import { IndexComponent } from './components/xuxemons/index/index.component';
import { UpdateComponent } from './components/xuxemons/update/update.component';
import { ParametrosComponent } from './components/parametros/parametros.component';

@NgModule({
  declarations: [
    AppComponent,
    XuxemonComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    ErrorComponentComponent,
    CreateComponent,
    IndexComponent,
    UpdateComponent,
    ParametrosComponent
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
