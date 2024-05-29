import {Routes} from '@angular/router';

import {authGuard} from './guards/auth.guard';

import {HomeComponent} from './pages/home/home.component';
import {TaskComponent} from './pages/task/task.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'task', component: TaskComponent, canActivate: [authGuard]},
    {path: 'task/:id', component: TaskComponent, canActivate: [authGuard]},
];
