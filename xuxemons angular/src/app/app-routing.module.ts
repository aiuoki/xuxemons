import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XuxemonComponent } from './components/xuxemon/xuxemon.component';
import { IndexComponent } from './components/xuxemons/index/index.component';
import { CreateComponent } from './components/xuxemons/create/create.component';
import { UpdateComponent } from './components/xuxemons/update/update.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

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
        component: ErrorComponent
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
