import {Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {TaskComponent} from './pages/task/task.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'task', component: TaskComponent},
];
