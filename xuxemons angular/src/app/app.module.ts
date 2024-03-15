import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { XuxemonComponent } from './components/usuario/xuxemon/xuxemon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { ParametrosComponent } from './components/admin/parametros/parametros.component';
import { IndexXuxemonsComponent } from './components/admin/xuxemons/index-xuxemons/index-xuxemons.component';
import { CreateXuxemonComponent } from './components/admin/xuxemons/create-xuxemon/create-xuxemon.component';
import { UpdateXuxemonComponent } from './components/admin/xuxemons/update-xuxemon/update-xuxemon.component';

@NgModule({
  declarations: [
    AppComponent,
    XuxemonComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    ParametrosComponent,
    IndexXuxemonsComponent,
    CreateXuxemonComponent,
    UpdateXuxemonComponent
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
