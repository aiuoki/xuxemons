import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { ParametrosComponent } from './components/admin/parametros/parametros.component';
import { IndexXuxemonsComponent } from './components/admin/xuxemons/index-xuxemons/index-xuxemons.component';
import { CreateXuxemonComponent } from './components/admin/xuxemons/create-xuxemon/create-xuxemon.component';
import { UpdateXuxemonComponent } from './components/admin/xuxemons/update-xuxemon/update-xuxemon.component';
import { XuxedexComponent } from './components/user/xuxedex/xuxedex.component';
import { XuxemonComponent } from './components/usuario/xuxemon/xuxemon.component';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';

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
        component: ParametrosComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'mostrar-xuxemons',
        component: IndexXuxemonsComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'crear-xuxemon',
        component: CreateXuxemonComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'editar-xuxemon/:id',
        component: UpdateXuxemonComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'xuxedex',
        component: XuxedexComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'xuxemons',
        component: XuxemonComponent,
        canActivate: [AuthGuard]
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
