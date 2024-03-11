import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XuxemonComponent } from './xuxemon/xuxemon.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { IndexComponent } from './components/xuxemons/index/index.component';
import { CreateComponent } from './components/xuxemons/create/create.component';
import { UpdateComponent } from './components/xuxemons/update/update.component';
import { ParametrosComponent } from './components/parametros/parametros.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponentComponent
    },
    {
        path: 'register',
        component: RegisterComponentComponent
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
        path: 'error',
        component: ErrorComponentComponent
    },
    {
        path: 'xuxemons',
        component: XuxemonComponent
    },
    {
        path: 'parametros',
        component: ParametrosComponent
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
