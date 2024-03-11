import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ParametrosComponent } from './components/admin/parametros/parametros.component';
import { IndexComponent } from './components/admin/xuxemons/index/index.component';
import { CreateComponent } from './components/admin/xuxemons/create/create.component';
import { UpdateComponent } from './components/admin/xuxemons/update/update.component';
import { XuxemonComponent } from './components/usuario/xuxemon/xuxemon.component';
import { ErrorComponent } from './components/error/error.component';


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
        path: 'parametros',
        component: ParametrosComponent
    },
    {
        path: 'mostrar-xuxemons',
        component: IndexComponent
    },
    {
        path: 'crear-xuxemon',
        component: CreateComponent
    },
    {
        path: 'editar-xuxemon/:id',
        component: UpdateComponent
    },
    {
        path: 'xuxemons',
        component: XuxemonComponent
    },
    {
        path: 'error',
        component: ErrorComponent
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
