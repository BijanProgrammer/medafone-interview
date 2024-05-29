import {Component} from '@angular/core';
import {TaskService} from '../../services/task.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    public constructor(public taskService: TaskService) {}
}
