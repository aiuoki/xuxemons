import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XuxemonComponent } from './xuxemon/xuxemon.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { ErrorComponentComponent } from './error-component/error-component.component';

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
        path: 'error',
        component: ErrorComponentComponent
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
