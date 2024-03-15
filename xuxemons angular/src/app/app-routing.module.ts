import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { ParametrosComponent } from './components/admin/parametros/parametros.component';
import { IndexXuxemonsComponent } from './components/admin/xuxemons/index-xuxemons/index-xuxemons.component';
import { CreateXuxemonComponent } from './components/admin/xuxemons/create-xuxemon/create-xuxemon.component';
import { UpdateXuxemonComponent } from './components/admin/xuxemons/update-xuxemon/update-xuxemon.component';
import { XuxemonComponent } from './components/usuario/xuxemon/xuxemon.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: 'parametros',
        component: ParametrosComponent
    },
    {
        path: 'mostrar-xuxemons',
        component: IndexXuxemonsComponent
    },
    {
        path: 'crear-xuxemon',
        component: CreateXuxemonComponent
    },
    {
        path: 'editar-xuxemon/:id',
        component: UpdateXuxemonComponent
    },
    {
        path: 'xuxemons',
        component: XuxemonComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/error',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
