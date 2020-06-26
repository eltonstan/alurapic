import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';

const routes: Routes = [
    {
        path: '',
        // pathMath full garante que somente se acessar exatamente o caminho em branco que será utilizado essa rota
        // sem o pathMatch o angular entende que qualquer caminho colocado deve primeiro passar pela rota configurada com o path ''
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        // Representa uma rota que possui rotas filhas
        path: 'home',
        loadChildren: './home/home.module#HomeModule'  
    },
    
    {   path: 'user/:userName', 
        component: PhotoListComponent,
        resolve: { photos: PhotoListResolver },
        data: { 
            title: 'Timeline'
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [AuthGuard],
        data: { 
            title: 'Photo Upload'
        }
    },
    { 
        path: 'p/:photoId', 
        component: PhotoDetailsComponent,
        data: { 
            title: 'Photo Detail'
        }
    },
    { 
        path: 'not-found', 
        component: NotFoundComponent, 
        data: { 
            title: 'Not Found'
        }
    },
    { 
        path: '**', 
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }