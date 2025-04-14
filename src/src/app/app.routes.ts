import { Routes } from '@angular/router';
import { HomeRoute } from './routes';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeRoute
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
    }
];
