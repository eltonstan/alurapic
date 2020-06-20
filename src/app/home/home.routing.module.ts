import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginGuard } from '../core/auth/login.guard';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
    {
        // Representa uma rota que possui rotas filhas
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
        children: [
            {
                // Por esse filho estar sem path significa que ele sera o primeiro componente a ser acessado
                // junto com o pai
                path: '',
                component: SignInComponent
            },
            {
                path: 'signup',
                component: SignUpComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        // em rotas de lazy loading e obrigatorio usar o forChild no lugar do forRoot
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }