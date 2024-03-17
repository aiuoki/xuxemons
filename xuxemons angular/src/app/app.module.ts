import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { ParametrosComponent } from './components/admin/parametros/parametros.component';
import { IndexXuxemonsComponent } from './components/admin/xuxemons/index-xuxemons/index-xuxemons.component';
import { CreateXuxemonComponent } from './components/admin/xuxemons/create-xuxemon/create-xuxemon.component';
import { UpdateXuxemonComponent } from './components/admin/xuxemons/update-xuxemon/update-xuxemon.component';
import { XuxedexComponent } from './components/user/xuxedex/xuxedex.component';
import { IndexChuchesComponent } from './components/admin/chuches/index-chuches/index-chuches.component';
import { CreateChucheComponent } from './components/admin/chuches/create-chuche/create-chuche.component';
import { UpdateChucheComponent } from './components/admin/chuches/update-chuche/update-chuche.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './components/user/user-navbar/user-navbar.component';
import { AuthNavbarComponent } from './components/auth/auth-navbar/auth-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    ParametrosComponent,
    IndexXuxemonsComponent,
    CreateXuxemonComponent,
    UpdateXuxemonComponent,
    XuxedexComponent,
    IndexChuchesComponent,
    CreateChucheComponent,
    UpdateChucheComponent,
    AdminNavbarComponent,
    UserNavbarComponent,
    AuthNavbarComponent
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
