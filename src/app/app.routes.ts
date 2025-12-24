import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {
        path:'dashbord',
        component:Dashboard 
    },
    {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
    }
];
